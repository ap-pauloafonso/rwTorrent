import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
// import { CardPeerModel } from './card-peer-model';
import { Peer } from '../../Models/StatusReponseDTO';

@Component({
  selector: 'card-peer',
  templateUrl: './card-peer.component.html',
  styleUrls: ['./card-peer.component.css']
})


export class CardPeerComponent implements OnInit {
  @Input() peer: Peer;
  constructor() { }

  ngOnInit() {
  }



}
