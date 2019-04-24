import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialMagnetDialogComponent } from './material-magnet-dialog.component';

describe('MaterialMagnetDialogComponent', () => {
  let component: MaterialMagnetDialogComponent;
  let fixture: ComponentFixture<MaterialMagnetDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialMagnetDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialMagnetDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
