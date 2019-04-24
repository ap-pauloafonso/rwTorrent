import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CardTorrentModel } from './card-torrent-model';
import { StatusReponseDTO } from '../../Models/StatusReponseDTO';

@Component({
  selector: 'card-torrent',
  templateUrl: './card-torrent.component.html',
  styleUrls: ['./card-torrent.component.css']
})
export class CardTorrentComponent implements OnInit {

 @Input() torrentModel: StatusReponseDTO
 @Output() pauseUnpauseAction = new EventEmitter()
 @Output() selection =  new EventEmitter()
  constructor() { }

  ngOnInit() {
  }

}
