import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectorRef, ViewChild, ElementRef } from '@angular/core';
import { CardTorrentModel } from '../card-torrent/card-torrent-model';
import { Observable } from 'rxjs';
import { TorrentServiceService } from '../../torrent-service.service';
import { StatusReponseDTO } from '../../Models/StatusReponseDTO';
import { MatDialog } from '@angular/material';
import { DecideTorrentComponent } from '../decide-torrent/decide-torrent.component';
import { MaterialMagnetDialogComponent } from '../material-magnet-dialog/material-magnet-dialog.component';

@Component({
  selector: 'material-torrent-list',
  templateUrl: './material-torrent-list.component.html',
  styleUrls: ['./material-torrent-list.component.css']
})
export class MaterialTorrentListComponent implements OnInit {

  constructor(private _service: TorrentServiceService, private cd: ChangeDetectorRef, public dialog: MatDialog) { }


  @Input() dataSource: StatusReponseDTO[];
  @Output() torrentSelected = new EventEmitter();


  @ViewChild('fileInput') fileInput: ElementRef;
  @ViewChild('torrentFileButton') torrentFileButton: any;
  ngOnInit() {

  }

  trackByData(index: number, data: any) {
    return data.info_hash;
  }

  onClick(item) {
    this.torrentSelected.emit(item);
  }

  handlePauseUnpauseAction(torrent: StatusReponseDTO) {
    if (torrent.paused) {
      this._service.resumeTorrent(torrent.info_hash).subscribe(x => { });
    } else {
      this._service.pauseTorrent(torrent.info_hash).subscribe(x => { });
    }
  }


  openDialogDecide(type: string, content: string): void {
    const dialogRef = this.dialog.open(DecideTorrentComponent, {
      width: '400px',
      hasBackdrop: true,
      data: { type: type, content: content }
    });

    const dialogRefObs = dialogRef.afterClosed().subscribe(x => {
      this.fileInput.nativeElement.value = ''
      if (x) {
        if (x == 'F') {
          console.log(this.fileInput.nativeElement.files);
          this.fileInput.nativeElement.click()


        } else {
          this.openDialogMagnetLink();
        }
      }
    })




  }


  debug(){
    console.log('clickouuuu')
  }
  openDialogMagnetLink() {
    const dialogRef = this.dialog.open(MaterialMagnetDialogComponent, {
      width: '300px',
      hasBackdrop: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.openDialogDecide('M', result)
      }

    })
  }
  onFileChange(event) {
    const reader = new FileReader();

    if (event.target.files && event.target.files.length) {
      const [file] = event.target.files;
      reader.readAsDataURL(file);

      reader.onload = () => {
        let str_file = reader.result;
        str_file = (str_file as string).replace('data:application/x-bittorrent;base64,', '')

        reader.result
        // need to run CD since file load runs outside of zone
        this.cd.markForCheck();
        this.openDialogDecide('F', str_file);
      };
    }
  }

}
