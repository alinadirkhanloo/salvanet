import { CommonService } from './../../../core/services/common/common.service';
import { AuthService } from 'core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from 'app/shared/services/shared.service';
import { GenericClass } from 'app/core/models/genericClass.model';
import { AuthenticateErrors } from 'app/core/enums/errors.enum';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent extends GenericClass implements OnInit, OnDestroy {

  accountForm: FormGroup;
  disableButton = false;
  captchaImage: any;

  private conditions = {
    'auth/user-activation': 'accountActivation',
    'auth/change-password': 'forgetPassword',
    'auth/user-registration': 'registration'
  };
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private sharedService: SharedService, private commonService: CommonService
  ) {
    super();
    this.accountForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(10)]],
      mobile: ['', [Validators.required, Validators.pattern(`^09[0-9]{9}`), Validators.maxLength(11), Validators.minLength(11)]],
      captcha: ['', [Validators.required]],
      accessKey: ['', []],
      action: ['', []]
    });
  }

  ngOnInit(): void {

    let a = this.sharedService.returnUrl.value;

    if ((a == '' && sessionStorage.getItem('captchaAccessKey') !== null) ||
    (a !== '' && sessionStorage.getItem('captchaAccessKey') == null)) {
      this.router.navigateByUrl('auth/login');
    } else {
      this.accountForm.controls['action'].setValue(this.conditions[a]);
    this.getCaptcha();
    }

  }

  ngOnDestroy(): void {
    this.unsubscription();
  }

  getCaptcha() {
    this.subscription = this.auth.getCaptcha().subscribe(result => {
      const data = JSON.parse(result);
      this.captchaImage = data.image;
      sessionStorage.setItem('captchaAccessKey', data.id);
      this.accountForm.controls['accessKey'].setValue(sessionStorage.getItem('captchaAccessKey'));
    })
  }


  goToVerification() {

    this.disableButton = true;

    if (this.accountForm.valid) {
      this.subscription = this.auth.checkAndSendSms(this.accountForm.value).subscribe({
        next: (result) => {

          if (result === true) {
            // id number and phone number is correct
            sessionStorage.setItem('phoneNumber', this.accountForm.value.mobile);
            this.router.navigate(['/auth/login']);
            this.sharedService.showSuccess('رمز موقت ارسال شد و تا 2 دقیقه دیگر اعتبار دارد.', 3000);
          } else {
            this.disableButton = false;
            this.sharedService.showError('کدملی یا شماره موبایل اشتباه است');
            return
          }
        },
        error: (err) => {
          this.getCaptcha();
          this.disableButton = false;
        }
      });
    }

  }

  cancle() {
    this.router.navigateByUrl('/auth/login');
    this.sharedService.returnUrl.next('/auth/login');
  }

  get checkCodeMelli() {
    return this.commonService.checkCodeMelli(this.accountForm.controls['username'].value);
  }

}
