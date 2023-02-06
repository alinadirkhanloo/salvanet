import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JihadiGroupComponent } from './jihadi-group.component';

describe('JihadiGroupComponent', () => {
  let component: JihadiGroupComponent;
  let fixture: ComponentFixture<JihadiGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ JihadiGroupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(JihadiGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
