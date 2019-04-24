import { Component, OnInit, Input } from '@angular/core';
import { TabStatusModel } from './tab-status-model';
import { StatusReponseDTO } from '../../Models/StatusReponseDTO';

@Component({
  selector: 'material-tab-status',
  templateUrl: './material-tab-status.component.html',
  styleUrls: ['./material-tab-status.component.css']
})
export class MaterialTabStatusComponent implements OnInit {

  @Input() statusModel:StatusReponseDTO;
  constructor() { }

  ngOnInit() {
  }

}
