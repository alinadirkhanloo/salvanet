import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NaturalPersonsComponent } from './natural-persons.component';

describe('NaturalPersonsComponent', () => {
  let component: NaturalPersonsComponent;
  let fixture: ComponentFixture<NaturalPersonsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NaturalPersonsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NaturalPersonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
