import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core/services/auth/auth.service';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent implements OnInit{
  passType1='password';
  passType2='password';
passForm :FormGroup;
disableSubmitButton = false;
disableActiveationButton = false;
constructor(private router:Router,
  private route: ActivatedRoute,
  private _formBuilder:FormBuilder,
  private auth:AuthService,
  private shService:SharedService){

  this.passForm = this._formBuilder.group({
    pass: ['', [Validators.required,Validators.pattern('^(?=.*?[a-z])(.{36,}|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,36})$')]],
    repPass: ['', [Validators.required,Validators.pattern('^(?=.*?[a-z])(.{36,}|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,36})$')]],
  });

}
ngOnInit(): void {

  if (!this.auth.getUsername() && this.shService.returnUrl.value === '') {
    this.goToLogin();
  }
}

submit(){
  this.disableSubmitButton = true;

  if (this.passForm.valid) {
    this.auth.changePassword(this.auth.getUsername(),this.passForm.value.pass).subscribe({
      next:()=>{
        this.shService.showSuccess();
        this.shService.returnUrl.next('');
        this.goToLogin();
      },
      error:()=>{
        this.shService.showError();
        this.disableSubmitButton = false;
        return
      }
    });
  }
}

goToLogin(){
  this.router.navigate(['/'])
}

showPass1(){
  this.passType1==='password'?this.passType1='text':this.passType1='password'
}

showPass2(){
  this.passType2==='password'?this.passType2='text':this.passType2='password'
}

get isSame(){
  return this.passForm.value.pass !== this.passForm.value.repPass
}
}
