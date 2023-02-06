import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicTreeSelectComponent } from './dynamic-tree-select.component';

describe('DynamicTreeSelectComponent', () => {
  let component: DynamicTreeSelectComponent;
  let fixture: ComponentFixture<DynamicTreeSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DynamicTreeSelectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DynamicTreeSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
