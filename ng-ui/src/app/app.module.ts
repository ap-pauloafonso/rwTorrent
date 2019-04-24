import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { TorrentServiceService } from './torrent-service.service';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialContainerComponent } from './Components/material-container/material-container.component';
import { MatMenuModule } from '@angular/material/menu'
import { MatButtonModule, MatIconModule } from '@angular/material'
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { FlexLayoutModule } from "@angular/flex-layout";
import { CardTorrentComponent } from './Components/card-torrent/card-torrent.component';
import { MaterialTorrentListComponent } from './Components/material-torrent-list/material-torrent-list.component';
import { NgPipesModule } from 'ngx-pipes';
import { MatTabsModule } from '@angular/material/tabs';
import { MaterialTabStatusComponent } from './Components/material-tab-status/material-tab-status.component';
import { MaterialTabDetailsComponent } from './Components/material-tab-details/material-tab-details.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { CardPeerComponent } from './Components/card-peer/card-peer.component';
import { MaterialTabPeersComponent } from './Components/material-tab-peers/material-tab-peers.component';
import { MaterialTabPiecesComponent } from './Components/material-tab-pieces/material-tab-pieces.component';
import { Utils } from './Shared/utils';
import { MatDialogModule } from '@angular/material/dialog';
import { MaterialSpeedDialogComponent } from './Components/material-speed-dialog/material-speed-dialog.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { DecideTorrentComponent } from './Components/decide-torrent/decide-torrent.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MaterialMagnetDialogComponent } from './Components/material-magnet-dialog/material-magnet-dialog.component';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { TruncateTextPipe } from './Pipes/truncate-text.pipe';
import { RemoveDialogComponent } from './Components/remove-dialog/remove-dialog.component'
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SessionSettingsDialogComponent } from './Components/session-settings-dialog/session-settings-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { AuthInterceptor } from './Auth/AuthInterceptor';
import { AuthDialogComponent } from './Components/auth-dialog/auth-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MaterialContainerComponent,
    CardTorrentComponent,
    MaterialTorrentListComponent,
    MaterialTabStatusComponent,
    MaterialTabDetailsComponent,
    CardPeerComponent,
    MaterialTabPeersComponent,
    MaterialTabPiecesComponent,
    MaterialSpeedDialogComponent,
    DecideTorrentComponent,
    MaterialMagnetDialogComponent,
    TruncateTextPipe,
    RemoveDialogComponent,
    SessionSettingsDialogComponent,
    AuthDialogComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatMenuModule,
    MatButtonModule,
    MatToolbarModule,
    MatCardModule,
    MatRippleModule,
    MatProgressBarModule,
    FlexLayoutModule,
    NgPipesModule,
    MatTabsModule,
    MatSlideToggleModule,
    MatSliderModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    FormsModule,
    ScrollingModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatCheckboxModule,
    MatSelectModule,
    MatDividerModule,
    MatListModule

    //  ScrollingModule
  ],
  providers: [Utils, TorrentServiceService,
    { provide: 'BASE_URL', useValue: window.document.location.origin},
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  entryComponents: [MaterialSpeedDialogComponent, DecideTorrentComponent, MaterialMagnetDialogComponent, RemoveDialogComponent, SessionSettingsDialogComponent, AuthDialogComponent]
})
export class AppModule { }
