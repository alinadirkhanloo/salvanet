import { AuthService } from 'core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  accountForm: FormGroup;
  disableButton = false;
  captchaImage:any;

  @Input() action:string;
  @Input() returnUrl:string;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private sharedService:SharedService
  ) {
    this.accountForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(10)]],
      mobile: ['', [Validators.required, Validators.pattern(`^09[0-9]{9}`), Validators.maxLength(11),Validators.minLength(11)]],
      captcha: ['', [Validators.required]],
      action: ['', []]
    });
  }


  ngOnInit(): void {
    this.getCaptcha();
    let a = this.sharedService.returnUrl.value;
    this.accountForm.controls['action'].setValue(this.action);
  }

  getCaptcha(){
    let x = this.auth.getCaptcha().subscribe(result=>{
      this.captchaImage = result;
      x.unsubscribe();
    })
  }


  goToVerification() {

    this.disableButton = true;

    if (this.accountForm.valid) {
      let rest = this.auth.checkAndSendSms(this.accountForm.value).subscribe({
        next: (result) => {

          if (result=== true) {
            // id number and phone number is correct
            this.router.navigate([this.returnUrl]);
            rest.unsubscribe();
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
