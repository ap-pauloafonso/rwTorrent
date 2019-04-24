import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialSpeedDialogComponent } from './material-speed-dialog.component';

describe('MaterialSpeedDialogComponent', () => {
  let component: MaterialSpeedDialogComponent;
  let fixture: ComponentFixture<MaterialSpeedDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialSpeedDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialSpeedDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
