import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoliticalStructureComponent } from './political-structure.component';

describe('PoliticalStructureComponent', () => {
  let component: PoliticalStructureComponent;
  let fixture: ComponentFixture<PoliticalStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoliticalStructureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoliticalStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
