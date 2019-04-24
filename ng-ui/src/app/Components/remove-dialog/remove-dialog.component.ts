import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { TorrentServiceService } from '../../torrent-service.service'


@Component({
  selector: 'app-remove-dialog',
  templateUrl: './remove-dialog.component.html',
  styleUrls: ['./remove-dialog.component.css']
})
export class RemoveDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<RemoveDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private service: TorrentServiceService,
    public snackBar: MatSnackBar) { }


  checkBooxValue: boolean = false;

  ngOnInit() {
  }

  onCloseConfirm() {
    this.service.postRemoveTorrent(this.data.info_hash, this.checkBooxValue).subscribe(success => {
      this.snackBar.open('Torrent Deleted!', null, { duration: 2000 })
      this.dialogRef.close()

    });
  }
  onCloseCancel() {

    this.dialogRef.close()

  }

}
