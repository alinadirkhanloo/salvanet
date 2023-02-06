import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PositionIncumbentComponent } from './position-incumbent.component';

describe('PositionIncumbentComponent', () => {
  let component: PositionIncumbentComponent;
  let fixture: ComponentFixture<PositionIncumbentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PositionIncumbentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PositionIncumbentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
