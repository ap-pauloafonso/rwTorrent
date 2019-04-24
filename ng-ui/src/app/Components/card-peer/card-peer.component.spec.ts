import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CardPeerComponent } from './card-peer.component';

describe('CardPeerComponent', () => {
  let component: CardPeerComponent;
  let fixture: ComponentFixture<CardPeerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CardPeerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CardPeerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
