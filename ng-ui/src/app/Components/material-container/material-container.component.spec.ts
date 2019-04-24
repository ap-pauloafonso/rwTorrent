import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MaterialContainerComponent } from './material-container.component';

describe('MaterialContainerComponent', () => {
  let component: MaterialContainerComponent;
  let fixture: ComponentFixture<MaterialContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MaterialContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MaterialContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
