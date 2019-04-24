import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SessionSettingsDialogComponent } from './session-settings-dialog.component';

describe('SessionSettingsDialogComponent', () => {
  let component: SessionSettingsDialogComponent;
  let fixture: ComponentFixture<SessionSettingsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SessionSettingsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionSettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
