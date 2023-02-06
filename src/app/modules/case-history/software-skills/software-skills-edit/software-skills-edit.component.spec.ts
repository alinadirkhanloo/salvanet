import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SoftwareSkillsEditComponent } from './software-skills-edit.component';

describe('SoftwareSkillsEditComponent', () => {
  let component: SoftwareSkillsEditComponent;
  let fixture: ComponentFixture<SoftwareSkillsEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SoftwareSkillsEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SoftwareSkillsEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
