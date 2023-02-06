import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriculturalLandComponent } from './agricultural-land.component';

describe('AgriculturalLandComponent', () => {
  let component: AgriculturalLandComponent;
  let fixture: ComponentFixture<AgriculturalLandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgriculturalLandComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgriculturalLandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
