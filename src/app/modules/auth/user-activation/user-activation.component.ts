import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/core/services/auth/auth.service';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'app-user-activation',
  templateUrl: './user-activation.component.html',
  styleUrls: ['./user-activation.component.css']
})
export class UserActivationComponent implements OnInit {

  passForm :FormGroup;
  disableSubmitButton = false;
  disableActiveationButton = false;
  username='';
  constructor(private router:Router,private route: ActivatedRoute,private _formBuilder:FormBuilder,private auth:AuthService
    ,private shService:SharedService){
    this.passForm = this._formBuilder.group({
      pass: ['', [Validators.required,Validators.pattern('^(?=.*?[a-z])(.{36,}|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,36})$')]],
      repPass: ['', [Validators.required,Validators.pattern('^(?=.*?[a-z])(.{36,}|(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,36})$')]],
    });
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.username = this.auth.getUsername();
    if (!this.username || this.shService.returnUrl.value=== '') {
      this.goToLogin();
    }
  }

  submit(){
    this.disableSubmitButton = true;
    if (this.passForm.valid) {
      this.auth.accountActivation(this.username,this.passForm.value.pass).subscribe({
        next:()=>{
          this.shService.showSuccess();
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
  get isSame(){
    return this.passForm.value.pass !== this.passForm.value.repPass
  }
  }
