import libtorrent as lt
import time
# from RestClient import restClient
from flask import Flask, request
from flask_restful import Resource, Api
from flask_cors import CORS
from json import dumps
import threading
import time
import os
import json
import hashlib
import sys
import geoip2.database
from TorrentUtils import TorrentUtils
import base64
import tempfile
import threading
import datetime
from TorrentErrorHandler import TorrentException, TorrentErrorEnum


class torrent_client(threading.Thread):
    def __init__(self):
        threading.Thread.__init__(self, daemon=True)

    def run(self):
        self.state_str = ['queued', 'checking', 'downloading metadata',
                          'downloading', 'finished', 'seeding', 'allocating', 'aaaa', 'bbbbbbb']
        self.session = lt.session()
        self.session.listen_on(6881, 6891)
        self.session_torrents_path = './session_torrents/'
        self.countrylookup = {}
        self.reader = geoip2.database.Reader('./GeoLite2-Country.mmdb')
        self.file_List = self.load_session_torrents()
        self.downloading_t_metadata_dic = {}
        self.torrent_decide_dic = {}
        while True:  # (not self.s.is_seeding):
            alerts = self.session.pop_alerts()

            # for a in alerts:
            # print('['+a.what()+']'+a.message())

            # print ('{} |{:.2f}progress - {}donwloadrate - {} uploadrate - {}peers - {}'.format(self.s.name,self.s.progress * 100, self.s.download_rate / 1000, self.s.upload_rate / 1000, self.s.num_peers, state_str[self.s.state]))
            time.sleep(1)

    def load_session_torrents(self):
        file_lit = []
        torrent_handle_List = []
        for i in os.listdir(self.session_torrents_path):
            if i.endswith('.torrent'):
                file_lit.append(
                    open(self.session_torrents_path+'/'+i, 'rb').read())
        for x in file_lit:
            info = lt.torrent_info(lt.bdecode(x))
            torrent_handle_List.append(self.session.add_torrent(
                {'save_path': './downloads', 'storage_mode': lt.storage_mode_t.storage_mode_sparse, 'ti': info, 'flags': lt.add_torrent_params_flags_t.flag_duplicate_is_error}))
        return torrent_handle_List

    def handleTorrentAnswer(self, str_hash, answer):
        if(str_hash in self.torrent_decide_dic):
            if(answer == 'Y'):
                t_info = self.torrent_decide_dic[str_hash]
                try:
                    t_handler = self.session.add_torrent({'save_path': './downloads', 'storage_mode': lt.storage_mode_t.storage_mode_sparse,
                                                          'ti': t_info, 'flags': lt.add_torrent_params_flags_t.flag_duplicate_is_error})
                except Exception as err:
                    raise TorrentException(
                        TorrentErrorEnum.DUPLICATED_TORRENT_SESSION_ERROR)
                torrent_file = lt.create_torrent(t_handler.torrent_file())
                self.PersistTorrent2Disk(self.session_torrents_path + str(
                    t_info.info_hash()) + '.torrent', lt.bencode(torrent_file.generate()))
            self.torrent_decide_dic.pop(str_hash)

    def PersistTorrent2Disk(self, path, t_file):
        with open(path, 'wb') as f:
            f.write(t_file)

    def addValidFile2DecideArray(self, base64_str):

        test = base64.decodebytes(bytes(base64_str, 'UTF-8'))
        t_info = lt.torrent_info(lt.bdecode(
            base64.decodebytes(bytes(base64_str, 'UTF-8'))))
        self.torrent_decide_dic[str(t_info.info_hash())] = t_info
        return {'name': t_info.name(), 'info_hash': str(t_info.info_hash()), 'total_size': t_info.total_size(), 'num_pieces': t_info.num_pieces(), 'piece_length': t_info.piece_length()}

    def addValidMagnetLink2DecideArray(self, magnet_link):
        temp_session = lt.session()
        params = {
            'save_path': tempfile.mkdtemp(),
            'storage_mode': lt.storage_mode_t(2),
            'file_priorities': [0]*5
        }

        t_handler = lt.add_magnet_uri(temp_session, magnet_link, params)
        t_status = t_handler.status()

        if(not t_status.error is '' or not t_handler.is_valid()):
            raise Exception('Invalid magnet_link')

        if(magnet_link in self.downloading_t_metadata_dic):
            self.downloading_t_metadata_dic.pop(magnet_link)
        self.downloading_t_metadata_dic[magnet_link] = datetime.datetime.now(
        ) + datetime.timedelta(minutes=15)
        while(not t_handler.has_metadata()):
            if(self.downloading_t_metadata_dic[magnet_link] <= datetime.datetime.now()):
                self.downloading_t_metadata_dic.pop(magnet_link)
                raise Exception(
                    '15 minutes elapsed trying to downloading metadata Exception')
            time.sleep(1)
        t_info = t_handler.get_torrent_info()
        self.downloading_t_metadata_dic.pop(magnet_link)
        self.torrent_decide_dic[str(t_info.info_hash())] = t_info
        return {'name': t_info.name(), 'info_hash': str(t_info.info_hash()), 'total_size': t_info.total_size(), 'num_pieces': t_info.num_pieces(), 'piece_length': t_info.piece_length()}

    def get_t_peerinfo(self, t_handler):
        peer_list = t_handler.get_peer_info()
        peer_info = []
        # country_array = []
        for peer in peer_list:
            try:
                peer_info.append({'ip': str(peer.ip[0]),
                                  'port': str(peer.ip[1]),
                                  'client': peer.client,
                                  'total_download': peer.total_download,
                                  'total_upload': peer.total_upload,
                                  'down_speed': peer.down_speed,
                                  'up_speed': peer.up_speed,
                                  'country': self.reader.country(str(peer.ip[0])).country.iso_code,
                                  'progress': round(peer.progress*100, 2),
                                  'flags': peer.flags
                                  })
                # result = self.reader.country(str(peer.ip[0]))
                # country_array.append(result.country.iso_code)
            except Exception as ex:
                print(ex)
        return peer_info

    def get_pieces_download_qeue(self, t_handler):
        qeue_download_pieces = []
        pieces_info = t_handler.get_download_queue()

        for piece in pieces_info:
            qeue_download_pieces.append(piece['piece_index'])

        return qeue_download_pieces

    def get_t_pieces(self, str_hash):
        t_handler = self.getTorrentByHash(str_hash)
        if(t_handler):
            return {'info_hash': str_hash, 'pieces': t_handler.status().pieces}
        else:
            raise TorrentException(TorrentErrorEnum.INVALID_INFO_HASH)

    def get_t_info(self, str_hash):
        ret_array = []
        if str_hash:
            t_handler = self.getTorrentByHash(str_hash)
            if(t_handler):
                t_status = t_handler.status()
                ret = {'info_hash': str(t_status.info_hash),
                       'piece_count': t_status.num_pieces,
                       'piece_total': t_status.torrent_file.num_pieces(),
                       'piece_size': t_status.torrent_file.piece_length(),
                       'creation_date': str(t_status.torrent_file.creation_date()),
                       'creator': t_status.torrent_file.creator(),
                       'comment': t_status.torrent_file.comment(),
                       'total_size': t_status.torrent_file.total_size(),
                       # 'downloading_pieces': self.get_pieces_download_qeue(t_handler),\
                       'num_pieces': t_status.num_pieces,\
                       'pieces': t_status.pieces
                       }
                ret_array.append(ret)
                return ret_array

        t_handlers = self.session.get_torrents()
        for i in t_handlers:
            t_status = i.status()
            ret = {'info_hash': str(t_status.info_hash),
                   'piece_count': t_status.num_pieces,
                   'piece_total': t_status.torrent_file.num_pieces(),
                   'piece_size': t_status.torrent_file.piece_length(),
                   'creation_date': str(t_status.torrent_file.creation_date()),
                   'creator': t_status.torrent_file.creator(),
                   'comment': t_status.torrent_file.comment(),
                   'total_size': t_status.torrent_file.total_size(),\
                   # 'downloading_pieces': self.get_pieces_download_qeue(t_handler),\
                   'num_pieces': t_status.num_pieces,\
                   'pieces': t_status.pieces,\
                   'total_wanted': t_status.total_wanted,\
                   'total_downloaded_final': t_status.total_size - t_status.total_wanted,
                   }
            ret_array.append(ret)
        return ret_array

    def getSessionInformation(self):
        return {'download_rate': self.session.download_rate_limit(), 'upload_rate': self.session.upload_rate_limit()}

    def getStatus(self, hash_detail='', detail_type=''):
        status_info = []
        torrents = self.session.get_torrents()
        for i in torrents:
            t = i.status()
            downloading_qeue = self.get_pieces_download_qeue(i)

            if hash_detail and hash_detail == str(t.info_hash):
                if(detail_type == 'peers'):
                    status_info['torrent_detail']['peers'] = self.get_t_peerinfo(
                        i)
                elif(detail_type == 't_info'):
                    status_info['torrent_detail']['t_info'] = self.get_t_info(
                        hash_detail)

            status_info.append({'name': t.name,
                                'progress': round(t.progress*100, 2),
                                'download_rate': t.download_rate,
                                'upload_rate': t.upload_rate,
                                'num_peers': t.num_peers,
                                'state_str': self.state_str[t.state] if not t.paused else 'paused',
                                'total_download': t.total_download,
                                'total_upload': t.total_upload,
                                'all_time_download': t.all_time_download,
                                'info_hash': str(t.info_hash),
                               # 'pieces': t.pieces,
                                'downloading_piece_index': downloading_qeue,
                                'num_pieces': t.num_pieces,
                                'sequential_download': t.sequential_download,
                                'paused': t.paused,
                                'total_size': t.torrent_file.total_size(),
                                'total_wanted_done': t.total_wanted_done,
                                'total_done': t.total_done,
                                'total_done': t.total_done,
                                'peers': self.get_t_peerinfo(i),
                                'piece_count': t.num_pieces,
                                'piece_total': t.torrent_file.num_pieces(),
                                'piece_size': t.torrent_file.piece_length(),
                                'num_seeds': t.num_seeds,
                                'num_peers': t.num_peers,
                                'download_limit': i.download_limit(),
                                'upload_limit': i.upload_limit()


                                # 'peer_count': len(status_info['torrent_detail'])
                                # 'peer_list': country_array
                                })

        # print(json.dumps(status_info))
        return status_info

    def getTorrentByHash(self, hash):
        for i in self.session.get_torrents():
            if(str(i.status().info_hash) == hash):
                return i
        return None

    def pauseTorrent(self, str_hash):
        torrent = self.getTorrentByHash(str_hash)
        torrent.pause()

    def set_t_sequentialdownload(self, str_hash, is_active):
        t_handler = self.getTorrentByHash(str_hash)
        t_handler.set_sequential_download(is_active)

    def resumeTorrent(self, str_hash):
        torrent = self.getTorrentByHash(str_hash)
        torrent.resume()

    def removeTorrent(self, str_hash, del_disk=True):
        t_handler = self.getTorrentByHash(str_hash)
        if del_disk:
            self.session.remove_torrent(t_handler, 1)
        else:
            self.session.remove_torrent(t_handler)
        self.removeSessionPathTorrent(str_hash)

    def removeSessionPathTorrent(self, str_hash):
        os.remove(self.session_torrents_path+str_hash+'.torrent')

    def add_magnet_link(self, magnet_link):
        t_handler = self.session.add_torrent({'save_path': './downloads', 'storage_mode': lt.storage_mode_t.storage_mode_sparse,
                                              'url': magnet_link, 'flags': lt.add_torrent_params_flags_t.flag_duplicate_is_error})
        self.download_torrent_file_async(t_handler)

    def add_torrent_file(self, torrent_file):
        # torrent_file.save(_path)
        # saved_torrent = open(_path,'rb').read()
        m_torrent = torrent_file.read()
        try:
            t_info = lt.torrent_info(lt.bdecode(m_torrent))
            _path = self.session_torrents_path + \
                str(t_info.info_hash())+'.torrent'
            self.session.add_torrent({'save_path': './downloads', 'storage_mode': lt.storage_mode_t.storage_mode_sparse,
                                      'ti': t_info, 'flags': lt.add_torrent_params_flags_t.flag_duplicate_is_error})
            with open(_path, 'wb') as f:
                f.write(m_torrent)
        except Exception as ex:
            return 'invalid torrent_file'

    def session_upload_limit(self, rate):
        session_settings = self.session.get_settings()
        session_settings['upload_rate_limit'] = rate
        self.session.apply_settings(session_settings)

    def session_donwload_limit(self, rate):
        session_settings = self.session.get_settings()
        session_settings['download_rate_limit'] = rate
        self.session.apply_settings(session_settings)

    def torrent_download_limit(self, info_hash, rate):
        t_handler = self.getTorrentByHash(info_hash)
        t_handler.set_download_limit(TorrentUtils.Kb2byte(rate))

    def torrent_upload_limit(self, info_hash, rate):
        t_handler = self.getTorrentByHash(info_hash)
        t_handler.set_upload_limit(TorrentUtils.Kb2byte(rate))

    def download_torrent_file_async(self, t_handler):
        while t_handler.torrent_file() is None:
            time.sleep(0.1)

        torrent_file = lt.create_torrent(t_handler.torrent_file())
        path = self.session_torrents_path + \
            str(t_handler.torrent_file().info_hash())+'.torrent'
        with open(path, "wb") as f:
            f.write(lt.bencode(torrent_file.generate()))
