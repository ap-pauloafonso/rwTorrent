from flask import Flask, request, jsonify, Response, render_template, make_response
from flask_restful import Resource, Api
from flask_cors import CORS, cross_origin
from flask_httpauth import HTTPBasicAuth
import threading
import time
from datetime import datetime
import logging
from TorrentClient import torrent_client
from werkzeug.serving import WSGIRequestHandler
from TorrentErrorHandler import TorrentException, handleError
import webbrowser



#from flask.ext.jsonpify import jsonify

auth = HTTPBasicAuth()
key_auth = ''

@auth.verify_password
def verify(username, password):
    return password == key_auth




class restClient():
    def __init__(self, port, flag_open_browser = False):
        self.port = port
        self.flag_open_browser = flag_open_browser
        self.comeca()
        

    def comeca(self):
        app = Flask(__name__)
        cors = CORS(app, resources={r"/*": {"origins": "*"}})
        self.TorrentServer = torrent_client()
        self.TorrentServer.start()
        api = Api(app)

        log = logging.getLogger('werkzeug')
        log.setLevel(logging.ERROR)
        api.add_resource(Status, '/status/', resource_class_kwargs={
                         'TorrentServer': self.TorrentServer}, endpoint="status")  # Route_1
        api.add_resource(Status, '/status/<detail_type>/<info_hash>/', resource_class_kwargs={
                         'TorrentServer': self.TorrentServer}, endpoint="statusdatail")  # Route_1

        api.add_resource(TorrentInfo, '/t_info/<info_hash>/', resource_class_kwargs={
                         'TorrentServer': self.TorrentServer}, endpoint='t_info_detail')  # Route_1
        api.add_resource(TorrentInfo, '/t_info', resource_class_kwargs={
                         'TorrentServer': self.TorrentServer}, endpoint='t_info')  # Route_1

        api.add_resource(pauseTorrent, '/pause',
                         resource_class_kwargs={'TorrentServer': self.TorrentServer})
        api.add_resource(resumeTorrent, '/resume',
                         resource_class_kwargs={'TorrentServer': self.TorrentServer})
        api.add_resource(AddMagnetLink, '/magnetlink',
                         resource_class_kwargs={'TorrentServer': self.TorrentServer})
        api.add_resource(AddTorrentFile, '/torrentfile',
                         resource_class_kwargs={'TorrentServer': self.TorrentServer})
        api.add_resource(removeTorrent, '/remove',
                         resource_class_kwargs={'TorrentServer': self.TorrentServer})
        api.add_resource(sessionDownloadLimit, '/s_downloadlimit',
                         resource_class_kwargs={'TorrentServer': self.TorrentServer})
        api.add_resource(sessionUploadLimit, '/s_uploadlimit',
                         resource_class_kwargs={'TorrentServer': self.TorrentServer})
        api.add_resource(torrentDownloadLimit, '/t_downloadlimit',
                         resource_class_kwargs={'TorrentServer': self.TorrentServer})
        api.add_resource(torrentUploadLimit, '/t_uploadlimit',
                         resource_class_kwargs={'TorrentServer': self.TorrentServer})

        api.add_resource(SetTorrentSequentialDonwload, '/sequentialdownload',
                         resource_class_kwargs={'TorrentServer': self.TorrentServer})

        api.add_resource(AddTorrent2DecideArray, '/AddTorrent2DecideArray',
                         resource_class_kwargs={'TorrentServer': self.TorrentServer})
        api.add_resource(AnswerDecideArray, '/AnswerDecideArray',
                         resource_class_kwargs={'TorrentServer': self.TorrentServer})
        api.add_resource(getSessionInformation, '/SessionInformation',
                         resource_class_kwargs={'TorrentServer': self.TorrentServer})

        api.add_resource(PiecesTorrent, '/PiecesTorrent',
                         resource_class_kwargs={'TorrentServer': self.TorrentServer})

        api.add_resource(CheckKeyAuth, '/CheckKeyAuth')
        api.add_resource(ngRwTorrent, '/')
        if(self.flag_open_browser):
            webbrowser.open('http://localhost:'+str(self.port), new=2)
        app.run(host='0.0.0.0', port=self.port)
        
class CheckKeyAuth(Resource):
    def __init__(self):
        pass
    def post(self):
        if verify('',request.get_json()['key_auth']):
            return {}
        return 'AUTH ERROR',401


class ngRwTorrent(Resource):
    def __init__(self):
        pass
    def get(self):
        headers = {'Content-Type': 'text/html'}
        return make_response(render_template('index.html'),200,headers)

class TorrentInfo(Resource):
    def __init__(self, TorrentServer):
        self.TorrentServer = TorrentServer
    @auth.login_required
    def get(self, info_hash=None):
        return self.TorrentServer.get_t_info(info_hash)


class Status(Resource):

    def __init__(self, TorrentServer):
        self.TorrentServer = TorrentServer

    @auth.login_required
    def get(self, detail_type=None, info_hash=None):
        return self.TorrentServer.getStatus(info_hash, detail_type)


class removeTorrent(Resource):
    def __init__(self, TorrentServer):
        self.TorrentServer = TorrentServer
    @auth.login_required
    def post(self):
        return self.TorrentServer.removeTorrent(request.get_json()['info_hash'], request.get_json()['del_disk_flag'])

class PiecesTorrent(Resource):
    def __init__(self, TorrentServer):
        self.TorrentServer = TorrentServer

    @auth.login_required
    def post(self):
        try:
            return self.TorrentServer.get_t_pieces(request.get_json()['info_hash'])
        except Exception as ex:
            return handleError(ex)
    
class sessionDownloadLimit(Resource):
    def __init__(self, TorrentServer):
        self.TorrentServer = TorrentServer

    @auth.login_required
    def post(self):
        return self.TorrentServer.session_donwload_limit(request.get_json()['rate'])


class sessionUploadLimit(Resource):
    def __init__(self, TorrentServer):
        self.TorrentServer = TorrentServer
    @auth.login_required
    def post(self):
        return self.TorrentServer.session_upload_limit(request.get_json()['rate'])

class getSessionInformation(Resource):
    def __init__(self,TorrentServer):
        self.TorrentServer = TorrentServer

    @auth.login_required
    def get(self):
        return self.TorrentServer.getSessionInformation()


class torrentDownloadLimit(Resource):
    def __init__(self, TorrentServer):
        self.TorrentServer = TorrentServer
    @auth.login_required
    def post(self):
        return self.TorrentServer.torrent_download_limit(request.get_json()['info_hash'], request.get_json()['rate'])


class torrentUploadLimit(Resource):
    def __init__(self, TorrentServer):
        self.TorrentServer = TorrentServer

    @auth.login_required
    def post(self):
        return self.TorrentServer.torrent_upload_limit(request.get_json()['info_hash'], request.get_json()['rate'])


class pauseTorrent(Resource):
    def __init__(self, TorrentServer):
        self.TorrentServer = TorrentServer

    @auth.login_required
    def post(self):
        return self.TorrentServer.pauseTorrent(request.get_json()['str_hash'])


class AddTorrent2DecideArray(Resource):
    def __init__(self, TorrentServer):
        self.TorrentServer = TorrentServer

    @auth.login_required
    def post(self):
        try:
            method_type =  request.get_json()['method_type']
            if(method_type == 'F'):
                return self.TorrentServer.addValidFile2DecideArray(request.get_json()['base64_file'])
            else:
                return self.TorrentServer.addValidMagnetLink2DecideArray(request.get_json()['magnet_link'])
        except Exception as err:
            return {'err' : str(err)}, 500


class AnswerDecideArray(Resource):
    def __init__(self, TorrentServer):
        self.TorrentServer = TorrentServer

    @auth.login_required
    def post(self):
        try:
            return self.TorrentServer.handleTorrentAnswer(request.get_json()['info_hash'], request.get_json()['answer'])
        except Exception as ex:
            handle = handleError(ex)
            return handleError(ex)


class resumeTorrent(Resource):
    def __init__(self, TorrentServer):
        self.TorrentServer = TorrentServer

    @auth.login_required
    def post(self):
        return self.TorrentServer.resumeTorrent(request.get_json()['str_hash'])


class AddMagnetLink(Resource):
    def __init__(self, TorrentServer):
        self.TorrentServer = TorrentServer

    @auth.login_required
    def post(self):
        # request.args['magnet_link']
        magnet_link = request.get_json()['magnet_link']
        return self.TorrentServer.add_magnet_link(magnet_link)


class AddTorrentFile(Resource):
    def __init__(self, TorrentServer):
        self.TorrentServer = TorrentServer

    @auth.login_required
    def post(self):
        try:
            torrent = request.files['file']
            return self.TorrentServer.add_torrent_file(torrent)
        except Exception as ex:
            return str(ex)


class SetTorrentSequentialDonwload(Resource):
    def __init__(self, TorrentServer):
        self.TorrentServer = TorrentServer
        
    @auth.login_required
    def post(self):
        str_hash = request.get_json()['str_hash']
        active = request.get_json()['active']
        return self.TorrentServer.set_t_sequentialdownload(str_hash, active)
