import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTorrentListComponent } from './material-torrent-list.component';

describe('MaterialTorrentListComponent', () => {
  let component: MaterialTorrentListComponent;
  let fixture: ComponentFixture<MaterialTorrentListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialTorrentListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTorrentListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
