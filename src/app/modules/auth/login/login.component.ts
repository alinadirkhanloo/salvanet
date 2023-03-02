import { SharedService } from 'shared/services/shared.service';
import { AuthService } from 'app/core/services/auth/auth.service';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'app/core/interfaces/user.interface';
import { GenericClass } from 'app/core/models/genericClass.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html'
})
export class LoginComponent extends GenericClass implements OnInit,OnDestroy {


  loginForm: FormGroup;
  disableLoginButton = false;
  disableActiveationButton = false;
  captchaImage: any;
  passTooltip = `کلمه عبور باید شامل:
  حداقل یک حرف بزرگ انگلیسی، حداقل یک حرف کوچک انگلیسی، حداقل یک عدد و یکی از علايم @*$# باشد
  `


  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private sharedService: SharedService
  ) {
    super();
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required, Validators.pattern('^(?=.*?[a-z])(.{36,}|(?=.*?[A-Z])(?=.*?[0-9]).{8,36})$')]],
      captcha: ['', [Validators.required]]
    });
  }
  ngOnDestroy(): void {
    this.unsubscription();
  }


  ngOnInit(): void {
    this.getCaptcha();
  }

  login() {
    this.disableActiveationButton = true;

    if (this.loginForm.valid) {
      this.subscription = this.auth.login(this.loginForm.value).subscribe({
        next: (result: any) => {

          if (result) {
            // id number and phone number is correct
            this.auth.setUsername(this.loginForm.value.username);
            if (!JSON.parse(result.idToken).activated)
              this.router.navigate(['auth/change-password']);
            else this.router.navigate([`${this.sharedService.returnUrl.value}`]);
            this.auth.setUser(result as User);
          } else {
            this.disableLoginButton = false;
            return
          }
        },
        error: () => {
          this.disableLoginButton = false;
        }
      });
    }
  }

  getCaptcha() {
    this.subscription = this.auth.getCaptcha().subscribe(result => {
      this.captchaImage = result;
    })
  }

  goToActivationtion() {
    this.router.navigate(['auth/user-authentication']);
    this.sharedService.returnUrl.next('auth/user-activation');
  }

  forgatenPass() {
    this.router.navigate(['auth/user-authentication']);
    this.sharedService.returnUrl.next('auth/change-password');
  }

  signUp() {
    this.router.navigate(['auth/user-authentication']);
    this.sharedService.returnUrl.next('auth/user-registration');
  }

}
