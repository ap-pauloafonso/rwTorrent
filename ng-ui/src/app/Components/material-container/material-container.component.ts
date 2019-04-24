import { Component, OnInit, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs';
import { TorrentServiceService } from '../../torrent-service.service';
import { CardTorrentModel } from '../card-torrent/card-torrent-model';
import { map, tap, switchMap } from 'rxjs/operators';
import { StatusReponseDTO } from '../../Models/StatusReponseDTO';

import { MediaChange, ObservableMedia } from "@angular/flex-layout";
import { Utils } from '../../Shared/utils';
import { MatDialog } from '@angular/material';
import { RemoveDialogComponent } from '../remove-dialog/remove-dialog.component';
import { SessionSettingsDialogComponent } from '../session-settings-dialog/session-settings-dialog.component';
import { AuthDialogComponent } from '../auth-dialog/auth-dialog.component';

@Component({
  selector: 'material-container',
  templateUrl: './material-container.component.html',
  styleUrls: ['./material-container.component.css']
})
export class MaterialContainerComponent implements OnInit {


  constructor(private _service: TorrentServiceService,
    media: ObservableMedia,
    private _utils: Utils,
    public dialog: MatDialog) {

    media.asObservable().subscribe(data => {
      this.isMobile = data.mqAlias == 'xs' || data.mqAlias == 'sm' ? true : false;
    });
  }

  isMobile: boolean;
  isMasterMobile: boolean = true;

  selectedDetail: any;
  selectedDetailType: string;

  dataSource: StatusReponseDTO[];

  torrentModelDataSource: CardTorrentModel[];

  isAuthenticated: boolean = false;


  ngOnInit() {
    setTimeout(() => this.openAuthDialog(), 0);
  }




  openAuthDialog() {
    const dialogRef = this.dialog.open(AuthDialogComponent, {
      width: '300px',
      disableClose: true
    });

    dialogRef.afterClosed().subscribe(result => {
      this.isAuthenticated = true;
      TorrentServiceService.KeyAuth = result
      this.getStatus()
    })
  }
  getStatus() {

    this._service.withInterval().switchMap(() => this._service.getStatus()).subscribe((x: any) => {
      this.dataSource = x;
      x.forEach(e => e.estimated_time = this._utils.getRemaingTime(e.total_size, e.total_wanted_done, e.download_rate, e.info_hash));
      if (this.selectedTorrent) {
        this.selectedTorrent = this.dataSource.find(t => t.info_hash == this.selectedTorrent.info_hash);
      }
    })
  }
  getTruncateTextLimit() {
    return this.isMobile ? 25 : 50
  }

  handleBackArrowHide() {
    if (this.isMobile && this.isMasterMobile) {
      return true;
    }
    if (this.isMobile && this.isMasterMobile == false) {
      return false;
    }
    if (!this.isMobile) {
      return true;
    }

  }
  selectedTorrent: StatusReponseDTO;
  onRemoveClick() {
    const dialogRef = this.dialog.open(RemoveDialogComponent, {
      width: '250px',
      hasBackdrop: true,
      data: { info_hash: this.selectedTorrent.info_hash, name: this.selectedTorrent.name }
    });
  }

  handlePauseUnpauseAction(torrent: StatusReponseDTO) {
    if (torrent.paused) {
      this._service.resumeTorrent(torrent.info_hash).subscribe(x => { });
    } else {
      this._service.pauseTorrent(torrent.info_hash).subscribe(x => { });
    }
  }
  onSettingsClick() {
    const dialogRef = this.dialog.open(SessionSettingsDialogComponent, {
      width: '250px',
      hasBackdrop: true,
    });
  }
  selectTorrent(data) {
    this.selectedTorrent = data;
    this.isMasterMobile = false;

  }
}
