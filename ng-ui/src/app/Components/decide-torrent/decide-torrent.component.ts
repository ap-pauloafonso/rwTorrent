import { Component, OnInit, OnDestroy, Inject, EventEmitter, Output } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TorrentServiceService } from '../../torrent-service.service';
import { Observable } from 'rxjs';
import { retry } from 'rxjs/operators';

@Component({
  selector: 'app-decide-torrent',
  templateUrl: './decide-torrent.component.html',
  styleUrls: ['./decide-torrent.component.css']
})
export class DecideTorrentComponent implements OnInit, OnDestroy {

  constructor(public service: TorrentServiceService,
    public dialogRef: MatDialogRef<DecideTorrentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public snackBar: MatSnackBar
  ) { }

  dataSource: any;
  invalidState: string;
  request: any;

  ngOnInit() {
    this.dialogRef.disableClose = true;
    if (this.data.type == 'F') {
      this.request = this.service.AddTorrent2DecideArray(this.data.type, this.data.content, null).subscribe(success => {
        this.dataSource = success;
      }, err => {
        this.invalidState = 'invalid_input'
      })
    } else {
      this.request = this.service.AddTorrent2DecideArray(this.data.type, null, this.data.content).subscribe(success => {
        this.dataSource = success;

      }, err => {
        this.invalidState = 'invalid_input'

      })
    }



  }

  onCloseRight() {

    if (!this.invalidState) {
      this.service.AnswerDecideArray(this.dataSource.info_hash, 'Y').subscribe(x => {
        this.snackBar.open(this.dataSource.name + ' added', null, { duration: 2000 });
        this.dialogRef.close()

      }, err => {
        this.invalidState = 'torrent_already_exist'
      })
    }
    else {
      this.dialogRef.close(this.data.type);
    }
  }

  onCloseLeft() {
    this.request.unsubscribe();
    if (this.dataSource) {
      this.service.AnswerDecideArray(this.dataSource.info_hash, 'N').subscribe(x => {
      })
    }

    this.dialogRef.close()

  }


  ngOnDestroy() {

  }
}
