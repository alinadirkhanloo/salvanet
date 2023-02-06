import { SharedService } from 'shared/services/shared.service';
import { AuthService } from 'app/core/services/auth/auth.service';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { User } from 'app/core/interfaces/user.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  disableLoginButton = false;
  disableActiveationButton = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private sharedService:SharedService
  ) {
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      code: ['', [Validators.required]]
    });
  }


  ngOnInit(): void { }

  login(){
    this.disableActiveationButton = true;
    // setTimeout(() => {
    //   this.disableActiveationButton = false;
    //   this.router.navigate(['/pages']);
    // }, 2000);

    if (this.loginForm.valid) {
      let rest = this.auth.login(this.loginForm.value).subscribe({
        next: (result) => {
          
          if (result) {
            // id number and phone number is correct
            this.router.navigate(['/pages']);
            this.auth.setUser(result as User);
            rest.unsubscribe();
          } else {
            this.disableActiveationButton = false;
            return
          }
        },
        error: () => {
            this.disableActiveationButton = false;
        },
        complete:()=> {
          rest.unsubscribe();
        },
      });
    }
  }

  goToActivationtion() {
    this.router.navigate(['auth/user-authentication']);
    this.sharedService.returnUrl.next('auth/user-activation');
  }

  forgatenPass(){
    this.router.navigate(['auth/user-authentication']);
    this.sharedService.returnUrl.next('auth/change-password');
  }

  signUp(){
    this.router.navigate(['auth/user-authentication']);
    this.sharedService.returnUrl.next('auth/user-registration');
  }
}
