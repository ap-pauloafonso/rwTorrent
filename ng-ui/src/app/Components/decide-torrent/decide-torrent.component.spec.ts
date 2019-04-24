import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DecideTorrentComponent } from './decide-torrent.component';

describe('DecideTorrentComponent', () => {
  let component: DecideTorrentComponent;
  let fixture: ComponentFixture<DecideTorrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DecideTorrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DecideTorrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
