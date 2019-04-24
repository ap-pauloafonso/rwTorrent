import { Component, OnInit, Inject, ChangeDetectorRef, AfterViewInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TorrentServiceService } from '../../torrent-service.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-session-settings-dialog',
  templateUrl: './session-settings-dialog.component.html',
  styleUrls: ['./session-settings-dialog.component.css']
})
export class SessionSettingsDialogComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    this.cdf.detectChanges()
  }

  constructor(
    public dialogRef: MatDialogRef<SessionSettingsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public service: TorrentServiceService,
    public snackBar: MatSnackBar,
    private fb: FormBuilder,
    private cdf: ChangeDetectorRef
  ) {
    TorrentServiceService.interval.subscribe(x => { this.tickRate = x.toString(); })

  }


  download_limit: number;
  upload_limit: number;

  tickRate: string = '1000';




  speedForm: FormGroup
  ngOnInit() {

    this.fetchData();

    this.speedForm = this.fb.group({ speedLimit: this.fb.control('', [Validators.pattern('[0-9]*')]) });

  }


  handleTickRateChange(event) {
    this.service.setInterval(event)
  }
  fetchData(callback: () => void = null) {
    this.service.getSessionInformation().subscribe((x: any) => {
      this.download_limit = x.download_rate;
      this.upload_limit = x.upload_rate;

      if (callback) {
        callback();
      }
    })
  }


  selectedSpeed: number;
  selectedSpeedType: string;
  isMaster: boolean = true;

  isDownloadMode: boolean;


  onCloseSpeedConfirm() {
    this.selectedSpeed = Number(this.speedForm.get('speedLimit').value)

    if (this.selectedSpeedType == 'download') {
      this.service.postSessionDownloadRate(this.selectedSpeed).subscribe(x => {
        this.snackBar.open('Download Rate Limit is now' + this.selectedSpeed + 'KB/s  ', null, { duration: 2000 })
        this.fetchData(() => { this.isMaster = true; })
      })
    } else {
      this.service.postSessionUploadRate(this.selectedSpeed).subscribe(x => {
        this.snackBar.open('Upload Rate Limit is now' + this.selectedSpeed + 'KB/s  ', null, { duration: 2000 })
        this.fetchData(() => { this.isMaster = true; })
      })
    }

  }

  onCloseSpeedCancel() {
    this.isMaster = true;
  }

}
