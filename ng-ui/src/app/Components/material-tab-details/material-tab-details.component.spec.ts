import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialTabDetailsComponent } from './material-tab-details.component';

describe('MaterialTabDetailsComponent', () => {
  let component: MaterialTabDetailsComponent;
  let fixture: ComponentFixture<MaterialTabDetailsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialTabDetailsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialTabDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
