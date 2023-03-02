import { AuthService } from 'core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from 'app/shared/services/shared.service';
import { GenericClass } from 'app/core/models/genericClass.model';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent extends GenericClass implements OnInit,OnDestroy {

  accountForm: FormGroup;
  disableButton = false;
  captchaImage:any;

  private conditions = {
    'auth/user-activation': 'accountActivation',
    'auth/change-password': 'forgetPassword',
    'auth/user-registration': 'registration'
  };
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private sharedService:SharedService
  ) {
    super();
    this.accountForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(10)]],
      mobile: ['', [Validators.required, Validators.pattern(`^09[0-9]{9}`), Validators.maxLength(11),Validators.minLength(11)]],
      captcha: ['', [Validators.required]],
      action: ['', []]
    });
  }
  ngOnDestroy(): void {
    this.unsubscription();
  }


  ngOnInit(): void {
    this.getCaptcha();
    let a = this.sharedService.returnUrl.value;
    this.accountForm.controls['action'].setValue(this.conditions[a]);
  }

  getCaptcha(){
    this.subscription = this.auth.getCaptcha().subscribe(result=>{
      this.captchaImage = result;
    })
  }


  goToVerification() {

    this.disableButton = true;

    if (this.accountForm.valid) {
      this.subscription = this.auth.checkAndSendSms(this.accountForm.value).subscribe({
        next: (result) => {

          if (result=== true) {
            // id number and phone number is correct
            this.router.navigate(['/auth/login']);
          } else {
            this.disableButton = false;
            this.sharedService.showError('کدملی یا شماره موبایل اشتباه است');
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
