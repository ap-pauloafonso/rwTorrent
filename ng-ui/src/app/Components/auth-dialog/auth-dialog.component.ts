import { Component, OnInit, Output } from '@angular/core';
import { TorrentServiceService } from '../../torrent-service.service';
import { MatDialogRef, ErrorStateMatcher, MatSnackBar } from '@angular/material';
import 'rxjs/add/operator/finally';
@Component({
  selector: 'app-auth-dialog',
  templateUrl: './auth-dialog.component.html',
  styleUrls: ['./auth-dialog.component.css']
})
export class AuthDialogComponent implements OnInit {

  constructor(public dialogRef: MatDialogRef<AuthDialogComponent>, private service:TorrentServiceService,
    public snackBar: MatSnackBar) { }

  ngOnInit() {
  }

  isLoading:boolean = false;
  key_auth: string;

  myMatch = new MyErrorStateMatcher()
  onCloseConfirm() {
    let temp = this.key_auth; 
    this.isLoading = true;
    this.service.postCheckKeyAuth(temp).finally(()=>{this.isLoading = false}).subscribe(success=>{
      this.dialogRef.close(this.key_auth?this.key_auth: '')
    },err=>{
      this.snackBar.open('Invalid Key',null,{duration: 2000})
    })
  }

}


export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(isError): boolean {
    return isError;
  }
}