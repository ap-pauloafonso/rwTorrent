import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTabPeersComponent } from './material-tab-peers.component';

describe('MaterialTabPeersComponent', () => {
  let component: MaterialTabPeersComponent;
  let fixture: ComponentFixture<MaterialTabPeersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialTabPeersComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTabPeersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
