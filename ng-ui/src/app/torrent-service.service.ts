import { Injectable, OnInit, Inject } from '@angular/core';
import { Response } from '@angular/http';
import { Observable, BehaviorSubject, interval } from 'rxjs';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/switchMap'
import { HttpClient } from '@angular/common/http';
import { Endpoints } from './endpoints'
import { StatusReponseDTO } from './Models/StatusReponseDTO';
import { tap } from 'rxjs/operators';
import { Utils } from './Shared/utils';
import { environment } from '../environments/environment';


@Injectable({
  providedIn: 'root',
})
export class TorrentServiceService implements OnInit {
  ngOnInit(): void {
  }

  static interval: BehaviorSubject<number> = new BehaviorSubject<number>(1000);
  baseURL: string = 'http://localhost:5000'

  static KeyAuth: string = 'rwtorrent'


  constructor(private _http: HttpClient, _utils: Utils, @Inject('BASE_URL') relative_url: string) {

    if (environment.production) {
      this.baseURL = relative_url;
    }
    

  }

  setInterval(newInterval: number) {
    TorrentServiceService.interval.next(newInterval);
  }
  withInterval() {
    return TorrentServiceService.interval.switchMap(outerObsInterval => interval(outerObsInterval))
  }

  getStatus(info_hash: string = '', detail_type = ''): Observable<StatusReponseDTO> {
    if (detail_type != '' && info_hash != '') {
      let url = this.baseURL + Endpoints.status + detail_type + '/' + info_hash;
      return this._http.get<StatusReponseDTO>(url);
    }
    let url = this.baseURL + Endpoints.status;
    return this._http.get<StatusReponseDTO>(url);
  }

  postTorrentDownloadLimit(info_hash: string, speedLimit: number) {
    return this._http.post(this.baseURL + Endpoints.t_downloadlimit, { info_hash: info_hash, rate: speedLimit });
  }
  postTorrentUploadLimit(info_hash: string, speedLimit: number) {
    return this._http.post(this.baseURL + Endpoints.t_uploadlimit, { info_hash: info_hash, rate: speedLimit });
  }

  getTorrentInfo(str_hash: string = ''): Observable<any> {
    let url = str_hash ? this.baseURL + Endpoints.t_info + str_hash : this.baseURL + Endpoints.t_info

    return this._http.get(url);
  }


  pauseTorrent(str_hash: string) {
    let url = this.baseURL + Endpoints.pause;
    return this._http.post(url, { str_hash: str_hash })
  }

  resumeTorrent(str_hash: string) {
    let url = this.baseURL + Endpoints.resume
    return this._http.post(url, { str_hash: str_hash })
  }


  sequentialDownload(str_hash: string, isAcitive: boolean) {
    let url = this.baseURL + Endpoints.sequentialdownload
    return this._http.post(url, { str_hash: str_hash, active: isAcitive })
  }


  AddTorrent2DecideArray(method_type: string, base64_file: string = null, magnet_link: string = null) {
    let url = this.baseURL + Endpoints.AddTorrent2DecideArray
    let dto: any = {}
    if (method_type == 'F') {
      dto = { method_type: method_type, base64_file: base64_file }
    }
    else {
      dto = { method_type: method_type, magnet_link: magnet_link }
    }
    return this._http.post(url, dto);
  }

  AnswerDecideArray(info_hash: string, answer: string) {
    let url = this.baseURL + Endpoints.AnswerDecideArray
    return this._http.post(url, { info_hash: info_hash, answer: answer })
  }


  postRemoveTorrent(info_hash: string, del_disk_flag: boolean) {

    return this._http.post(this.baseURL + Endpoints.remove, { info_hash: info_hash, del_disk_flag: del_disk_flag })

  }


  getSessionInformation() {
    return this._http.get(this.baseURL + Endpoints.SessionInformation)
  }


  postSessionDownloadRate(downloadRate: number) {
    return this._http.post(this.baseURL + Endpoints.s_downloadlimit, { rate: downloadRate })
  }
  postSessionUploadRate(uploadRate: number) {
    return this._http.post(this.baseURL + Endpoints.s_uploadlimit, { rate: uploadRate })
  }


  postTorrentPieces(info_hash: string) {
    return this._http.post(this.baseURL + Endpoints.PiecesTorrent, { info_hash: info_hash })
  }

  postCheckKeyAuth(key_auth) {
    return this._http.post(this.baseURL + Endpoints.CheckKeyAuth, { key_auth: key_auth ? key_auth : '' })
  }
}
