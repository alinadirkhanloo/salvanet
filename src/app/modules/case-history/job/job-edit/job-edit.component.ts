import { AuthService } from 'core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit{

  jobEditForm: FormGroup;
  disableButton = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.jobEditForm = this._formBuilder.group({
      workPlace: ['', [Validators.required, Validators.maxLength(36)]],
      position: ['', [Validators.required, Validators.maxLength(36)]],
      startDate: ['', [Validators.required, Validators.maxLength(24)]],
      endDate: ['', [Validators.required, Validators.maxLength(24)]]
    });
  }


  ngOnInit(): void { }

  submit() {

    this.disableButton = true;

    if (this.jobEditForm.valid) {
      let rest = this.auth.checkAndSendSms(this.jobEditForm.value, this.jobEditForm.value).subscribe({
        next: (result) => {

          if (result['userCkeck']=== true) {
            // id number and phone number is correct
            this.router.navigate(['/auth/verification']);
            rest.unsubscribe();
          } else {
            this.disableButton = false;
            return
          }
        },
        error: () => {
            this.disableButton = false;
        }
      });
    }
  }

  cancle(){}


}
