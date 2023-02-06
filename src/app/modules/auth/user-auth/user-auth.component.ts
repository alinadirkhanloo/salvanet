import { AuthService } from 'core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  accountForm: FormGroup;
  disableButton = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.accountForm = this._formBuilder.group({
      idNumber: ['', [Validators.required, Validators.maxLength(10)]],
      phoneNumber: ['', [Validators.required, Validators.pattern(`^09[0-9]{9}`), Validators.maxLength(11)]]
    });
  }


  ngOnInit(): void { }

  goToVerification() {

    this.disableButton = true;

    // if (this.accountForm.valid) {
    //   let rest = this.auth.checkAndSendSms(this.accountForm.value.idNumber, this.accountForm.value.phoneNumber).subscribe({
    //     next: (result) => {

    //       if (result['userCkeck']=== true) {
            // id number and phone number is correct
            this.router.navigate(['/auth/user-verification']);
      //       rest.unsubscribe();
      //     } else {
      //       this.disableButton = false;
      //       return
      //     }
      //   },
      //   error: () => {
      //       this.disableButton = false;
      //   }
      // });
    // }
  }


}
