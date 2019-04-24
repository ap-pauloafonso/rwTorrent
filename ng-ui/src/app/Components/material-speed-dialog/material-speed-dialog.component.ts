import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';

@Component({
  selector: 'app-material-speed-dialog',
  templateUrl: './material-speed-dialog.component.html',
  styleUrls: ['./material-speed-dialog.component.css']
})
export class MaterialSpeedDialogComponent implements OnInit {

  constructor(private fb: FormBuilder, public dialogRef: MatDialogRef<MaterialSpeedDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  form: FormGroup;
  // speedLimit: FormControl
  ngOnInit() {
    // this.speedLimit = this.fb.control('', [Validators.max(100000), Validators.pattern('[0-9]*')])
    this.form = this.fb.group({ speedLimit: this.fb.control('',[ Validators.pattern('[0-9]*')]) });
  }


  onCloseConfirm() {
    this.dialogRef.close({isDownload: this.data.isDownload, value: this.form.get('speedLimit').value })
  }

  onCloseCancel() {
    this.dialogRef.close();
  }
}
