import { Component, OnInit, Input } from '@angular/core';
import { CardPeerModel } from '../card-peer/card-peer-model';
import { Peer } from '../../Models/StatusReponseDTO';

@Component({
  selector: 'material-tab-peers',
  templateUrl: './material-tab-peers.component.html',
  styleUrls: ['./material-tab-peers.component.css']
})
export class MaterialTabPeersComponent implements OnInit {


  @Input()peers: Peer[]
  constructor() { }

  ngOnInit() {
  }

  indentity(index, item){
    return item.ip +':'+item.port;
  }

}
