import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FogComponent } from './fog.component';

describe('FogComponent', () => {
  let component: FogComponent;
  let fixture: ComponentFixture<FogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
