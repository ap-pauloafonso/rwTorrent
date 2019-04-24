import { Component, OnInit, Input, OnChanges, SimpleChanges } from '@angular/core';
import { TabPieceModel } from './tab-pieces-model';
import { StatusReponseDTO } from '../../Models/StatusReponseDTO';
import { TorrentServiceService } from '../../torrent-service.service';

@Component({
  selector: 'material-tab-pieces',
  templateUrl: './material-tab-pieces.component.html',
  styleUrls: ['./material-tab-pieces.component.css']
})
export class MaterialTabPiecesComponent implements OnInit , OnChanges{
  constructor(private service: TorrentServiceService) { }


  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges): void {

    if(changes['infoHash']){
      this.fetchPieces()
      console.log('info_hash Changed')
    }
    if(changes['pieceCount']){
      this.fetchPieces()
      console.log('piece Count Changed')

    }
  }


fetchPieces(){
  this.service.postTorrentPieces(this.infoHash).subscribe((success:any)=>{
    this.dataSourcePieces = success.pieces
  })
}


  @Input() infoHash: string;

  @Input() downloadingQeue: number[]

  @Input() pieceCount: number
  @Input() pieceSize:number;
  @Input() pieceTotal:number;

  dataSourcePieces:boolean[]


  renderClass(item, index) {
    if (!item) {
      if (this.downloadingQeue.includes(index)) {
        return 'green-secondary'
      }
      return 'grey'
    }
    return 'green-primary'
  }

  trackByFn(index, item){
    return index;
  }


}
