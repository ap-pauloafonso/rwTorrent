import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTabStatusComponent } from './material-tab-status.component';

describe('MaterialTabStatusComponent', () => {
  let component: MaterialTabStatusComponent;
  let fixture: ComponentFixture<MaterialTabStatusComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialTabStatusComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTabStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
