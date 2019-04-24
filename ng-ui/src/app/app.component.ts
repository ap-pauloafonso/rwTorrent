import { Component } from '@angular/core';
import { TorrentServiceService } from './torrent-service.service';
import {Observable} from 'rxjs/Rx';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [TorrentServiceService]
})
export class AppComponent {

  dataSource: any ;




  title = 'app';


}
