import { AuthService } from 'app/core/services/auth/auth.service';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-edit',
  templateUrl: './account-edit.component.html'
})
export class AccountEditComponent implements OnInit {

  accountEditForm: FormGroup;
  disableButton = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.accountEditForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(36)]],
      usernameRepeat: ['', [Validators.required, Validators.maxLength(36)]],
      password: ['', [Validators.required, Validators.maxLength(24)]],
      passwordRepeat: ['', [Validators.required, Validators.maxLength(24)]],
      code: ['', [Validators.required, Validators.maxLength(8)]]
    });
  }


  ngOnInit(): void { }

  submit() {

    this.disableButton = true;

    if (this.accountEditForm.valid) {
      let rest = this.auth.checkAndSendSms(this.accountEditForm.value.username, this.accountEditForm.value.password).subscribe({
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
