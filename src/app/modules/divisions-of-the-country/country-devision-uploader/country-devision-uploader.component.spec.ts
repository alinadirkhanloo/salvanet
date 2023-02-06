import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CountryDevisionUploaderComponent } from './country-devision-uploader.component';

describe('CountryDevisionUploaderComponent', () => {
  let component: CountryDevisionUploaderComponent;
  let fixture: ComponentFixture<CountryDevisionUploaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CountryDevisionUploaderComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CountryDevisionUploaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
