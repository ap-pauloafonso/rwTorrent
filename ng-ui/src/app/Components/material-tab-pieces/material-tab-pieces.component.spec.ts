import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTabPiecesComponent } from './material-tab-pieces.component';

describe('MaterialTabPiecesComponent', () => {
  let component: MaterialTabPiecesComponent;
  let fixture: ComponentFixture<MaterialTabPiecesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialTabPiecesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTabPiecesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
