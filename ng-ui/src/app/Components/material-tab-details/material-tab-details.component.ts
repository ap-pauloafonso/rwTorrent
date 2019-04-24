import { Component, OnInit, Input, OnChanges } from '@angular/core';
import { TabDetailsModel } from './tab-details-model';
import { StatusReponseDTO } from '../../Models/StatusReponseDTO';
import { TorrentServiceService } from '../../torrent-service.service';
import { MatDialog } from '@angular/material';
import { MaterialSpeedDialogComponent } from '../material-speed-dialog/material-speed-dialog.component';

@Component({
  selector: 'material-tab-details',
  templateUrl: './material-tab-details.component.html',
  styleUrls: ['./material-tab-details.component.css']
})


export class MaterialTabDetailsComponent implements OnInit, OnChanges {
  ngOnChanges(): void {
  }
  checked: boolean = false;
  constructor(private _service: TorrentServiceService, public dialog: MatDialog) { }
  @Input() DetailsModel: StatusReponseDTO;
  ngOnInit() {
  }

  openDialog(isDownload: boolean): void {
    const dialogRef = this.dialog.open(MaterialSpeedDialogComponent, {
      width: '250px',
      hasBackdrop: true,
      data: { isDownload: isDownload, value: isDownload ? this.DetailsModel.download_limit : this.DetailsModel.upload_limit }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (result.isDownload) {
          this._service.postTorrentDownloadLimit(this.DetailsModel.info_hash,Number(result.value)).subscribe(x => { });

        } else {
          this._service.postTorrentUploadLimit(this.DetailsModel.info_hash, Number(result.value)).subscribe(x => { });

        }
      }

    });
  }
  switchChecked() {
    if (this.DetailsModel) {
      this.DetailsModel.sequential_download = !this.DetailsModel.sequential_download;
    }
  }

  handleSequentialClick() {
    if (this.DetailsModel.sequential_download) {
      this._service.sequentialDownload(this.DetailsModel.info_hash, false).subscribe(x => { });
      this.DetailsModel.sequential_download = false;
    } else {
      this._service.sequentialDownload(this.DetailsModel.info_hash, true).subscribe(x => { });
      this.DetailsModel.sequential_download = true;
    }
  }
}
