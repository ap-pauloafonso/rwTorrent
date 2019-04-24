import { Component, OnInit, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-material-magnet-dialog',
  templateUrl: './material-magnet-dialog.component.html',
  styleUrls: ['./material-magnet-dialog.component.css']
})

export class MaterialMagnetDialogComponent implements OnInit {

  @ViewChild('magnetInput') magnetInput: ElementRef;
  constructor(public dialogRef: MatDialogRef<MaterialMagnetDialogComponent>) { }

  ngOnInit() {
  }


  onCloseConfirm() {
    this.dialogRef.close(this.magnetInput.nativeElement.value)
  }

  onCloseCancel() {
    this.dialogRef.close()

  }
}
