import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationAnnouncementEditComponent } from './registration-announcement-edit.component';

describe('RegistrationAnnouncementEditComponent', () => {
  let component: RegistrationAnnouncementEditComponent;
  let fixture: ComponentFixture<RegistrationAnnouncementEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationAnnouncementEditComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegistrationAnnouncementEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
