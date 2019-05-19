import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SearhResultsComponent } from './searh-results.component';

describe('SearhResultsComponent', () => {
  let component: SearhResultsComponent;
  let fixture: ComponentFixture<SearhResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SearhResultsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SearhResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
