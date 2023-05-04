import { SharedService } from 'shared/services/shared.service';
import { AuthService } from 'app/core/services/auth/auth.service';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'app/core/interfaces/user.interface';
import { GenericClass } from 'app/core/models/genericClass.model';
import { AuthenticateErrors } from 'app/core/enums/errors.enum';



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
  passType='password';

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private sharedService: SharedService
  ) {
    super();
    this.loginForm = this._formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
      captcha: ['', [Validators.required]],
      accessKey: ['', []]
    });
  }
  ngOnDestroy(): void {
    this.unsubscription();
  }


  ngOnInit(): void {
    this.getCaptcha();
    this.sharedService.returnUrl.next('')
  }

  login() {
    this.disableActiveationButton = true;

    if (this.loginForm.valid) {
      this.subscription = this.auth.login(this.loginForm.value).subscribe({
        next: (result: any) => {
          // console.log(result);
          if (result) {
            // id number and phone number is correct
            this.auth.setUsername(this.loginForm.value.username);

            if (!JSON.parse(result.idToken).activated)
              this.router.navigate(['auth/change-password']);
            else {
              if (this.sharedService.returnUrl.value !== '') {
                this.router.navigateByUrl(this.sharedService.returnUrl.value);
              } else 
              this.router.navigateByUrl('/pages');
            }
            this.auth.setUser(result as User);
          } else {
            this.disableLoginButton = false;
            return
          }
        },
        error: (error) => {
          this.getCaptcha();
          if (error['0']=== 'passwordIsWrong') {
            this.sharedService.showError('کلمه عبور اشتباه است');
          }else
          if (error['0']=== 'accountExists') {
            this.sharedService.showError('حساب کاربری قبلا ایجاد شده است');
          }
          this.disableLoginButton = false;
        }
      });
    }
  }

  getCaptcha() {
    this.subscription = this.auth.getCaptcha().subscribe(
      {
        next:(result:any) => {
        
          const data = JSON.parse(result);
          this.captchaImage = data.image;
          sessionStorage.setItem('captchaAccessKey',data.id);
          this.loginForm.controls['accessKey'].setValue(data.id);
        },
        error:(err)=> {
        },
      }
    )
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

  showPass(){
    this.passType==='password'?this.passType='text':this.passType='password'
  }

}
