import { AuthService } from 'core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { SharedService } from 'app/shared/services/shared.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-user-auth',
  templateUrl: './user-auth.component.html',
  styleUrls: ['./user-auth.component.css']
})
export class UserAuthComponent implements OnInit {

  accountForm: FormGroup;
  disableButton = false;
  captchaImage:any;
  showCode=false;
  action:string;
  returnUrl:string;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService,
    private sharedService:SharedService,private acModal:NgbActiveModal
  ) {
    this.accountForm = this._formBuilder.group({
      username: ['', [Validators.required, Validators.maxLength(10)]],
      mobile: ['', [Validators.required, Validators.pattern(`^09[0-9]{9}`), Validators.maxLength(11),Validators.minLength(11)]],
      captcha: ['', [Validators.required]],
      code: ['', []]
    });
  }


  ngOnInit(): void {
    this.getCaptcha();
    let a = this.sharedService.returnUrl.value;
    this.accountForm.controls['action'].setValue(this.action);
  }

  getCaptcha() {
    this.auth.getCaptcha().subscribe(result => {
      const data = JSON.parse(result);
      this.captchaImage = data.image;
      // sessionStorage.setItem('captchaAccessKey', data.id);
    })
  }

  sendSms() {
    this.disableButton = true;
    if (this.accountForm.valid) {
      setTimeout(() => {
        this.showCode=true;
        this.disableButton = false;
      }, 2000);
      // let rest = this.auth.sendSms(this.accountForm.value).subscribe({
      //   next: (result) => {

      //     if (result=== true) {
      //       // id number and phone number is correct
      //       this.showCode=true;
      //       rest.unsubscribe();
      //     } else {
      //       this.disableButton = false;
      //       this.sharedService.showError('کدملی یا شماره موبایل اشتباه است');
      //       return
      //     }
      //   },
      //   error: () => {
      //       this.disableButton = false;
      //   }
      // });
    }
  }

  sendCode(){
    this.disableButton = true;
    if (this.accountForm.valid) {
      this.acModal.close(true);
      // let rest = this.auth.sendCode(this.accountForm.value).subscribe({
      //   next: (result) => {

      //     if (result=== true) {
      //       // id number and phone number is correct
      //       this.showCode=true;
      //       rest.unsubscribe();
      //     } else {
      //       this.disableButton = false;
      //       this.sharedService.showError('کدملی یا شماره موبایل اشتباه است');
      //       return
      //     }
      //   },
      //   error: () => {
      //       this.disableButton = false;
      //   }
      // });
    }
  }

  back(){
    this.showCode =false;
    this.accountForm.reset();
  }


}
