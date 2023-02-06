import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgriculturalLandEditComponent } from './agricultural-land-edit.component';

describe('AgriculturalLandEditComponent', () => {
  let component: AgriculturalLandEditComponent;
  let fixture: ComponentFixture<AgriculturalLandEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AgriculturalLandEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgriculturalLandEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
