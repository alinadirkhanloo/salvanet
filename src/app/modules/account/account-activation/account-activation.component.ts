import { AuthService } from 'core/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-account-activation',
  templateUrl: './account-activation.component.html',
})
export class AccountActivationComponent implements OnInit {

  accountActivationForm: FormGroup;
  disableButton = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.accountActivationForm = this._formBuilder.group({
      idNumber: ['', [Validators.required, Validators.maxLength(10)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(`^09[0-9]{9}`), Validators.maxLength(11)]]
    });
  }


  ngOnInit(): void { }

  goToVerification() {

    this.disableButton = true;

    if (this.accountActivationForm.valid) {
      let rest = this.auth.checkAndSendSms(this.accountActivationForm.value).subscribe({
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


}
