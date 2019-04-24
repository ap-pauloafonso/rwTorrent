import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardTorrentComponent } from './card-torrent.component';

describe('CardTorrentComponent', () => {
  let component: CardTorrentComponent;
  let fixture: ComponentFixture<CardTorrentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardTorrentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardTorrentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
