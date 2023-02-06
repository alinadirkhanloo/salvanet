import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriculturalWaterTypeComponent } from './agricultural-water-type.component';

describe('AgriculturalWaterTypeComponent', () => {
  let component: AgriculturalWaterTypeComponent;
  let fixture: ComponentFixture<AgriculturalWaterTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgriculturalWaterTypeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgriculturalWaterTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
