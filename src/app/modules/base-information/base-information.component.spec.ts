import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseInformationComponent } from './base-information.component';

describe('BaseInformationComponent', () => {
  let component: BaseInformationComponent;
  let fixture: ComponentFixture<BaseInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BaseInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
