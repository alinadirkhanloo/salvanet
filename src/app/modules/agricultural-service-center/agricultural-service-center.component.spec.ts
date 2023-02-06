import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriculturalServiceCenterComponent } from './agricultural-service-center.component';

describe('AgriculturalServiceCenterComponent', () => {
  let component: AgriculturalServiceCenterComponent;
  let fixture: ComponentFixture<AgriculturalServiceCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgriculturalServiceCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgriculturalServiceCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
