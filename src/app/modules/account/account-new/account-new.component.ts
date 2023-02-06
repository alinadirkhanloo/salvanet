import { AuthService } from 'app/core/services/auth/auth.service';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-new',
  templateUrl: './account-new.component.html'
})
export class AccountNewComponent implements OnInit {

  accountNewForm: FormGroup;
  disableButton = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.accountNewForm = this._formBuilder.group({
      personId: ['', [Validators.required]],
      personName: ['', [Validators.required]]
    });
  }


  ngOnInit(): void { }

  submit() {

    this.disableButton = true;

    if (this.accountNewForm.valid) {
      let rest = this.auth.checkAndSendSms(this.accountNewForm.value.username, this.accountNewForm.value.password).subscribe({
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
