import { User } from 'core/interfaces/user.interface';
import { AuthService } from 'core/services/auth/auth.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'app-user-verification',
  templateUrl: './user-verification.component.html',
  styleUrls: ['./user-verification.component.css']
})
export class UserVerificationComponent implements OnInit {

  // form controler of verification code with validators
  // we can use this Validators.pattern(`^[0-9]{5}`)
  verificationForm = new FormGroup({
    verificationCode: new FormControl('',[Validators.required, Validators.maxLength(20)])
 });

  // timer parameters
  minutes = 0;
  second = 5;

  canResendCode = false; // can resend verification code
  disableButton = false; // disable submit button

  idNumber = '';
  phoneNumber = '';


  constructor(
    private router: Router,
    private auth: AuthService,
    private sharedService:SharedService
  ) { }


  ngOnInit() {

    // After 1s timer start for enable resend code
    setTimeout(() => {
      this.startTimer();
    }, 1000);

  }

  submit() {
    // this.disableButton = true;
    this.router.navigate(['auth/login']);
    // if (this.verificationForm.controls['verificationCode'].invalid) return;
    // else {
    //   this.auth.verifyCode(this.verificationForm.controls['verificationCode'].value, this.phoneNumber).subscribe({
    //     next: (result) => {

    //       // Get user from response
    //       let userTemp: User = result as User;

    //       // add user to localStorage
    //       this.auth.setUser(userTemp);

    //       // Code verified and redirect to home page
    //       // this.router.navigate(["/home"]);
    //       this.router.navigate([this.sharedService.returnUrl.value]);
    //     },
    //     error: () => { this.disableButton = false; }
    //   });
    // }
  }

  startTimer() {
    let timer = setTimeout((x) => {

      this.second -= 1;// decriment of seconds

      if (this.second <= 0) // chekk finishing of second timer

        if (this.second === 0 && 0 === this.minutes) this.canResendCode = true; // if min and sec ==0  then  => time finish
        else {
          // decriment of minutes
          this.minutes -= 1;
          this.second = 59;
        }

      if (0 <= this.minutes && !this.canResendCode) { // call recarsive start timer
        this.startTimer();
      } else {                     // clear timer for start againe
        this.canResendCode = true;
        clearTimeout(timer);
      }
    }, 1000);
  }

  resendVerificationCode() {
    // this.auth.resendSms(this.idNumber, this.phoneNumber, this.setTimerState).subscribe({
    //   next: (result)=>{},
    //   error: (err)=>{}
    // });
  }

  setTimerState = () => {
    this.minutes = 1;
    this.second = 59;
    this.canResendCode = false;
    this.startTimer();
  }

}
