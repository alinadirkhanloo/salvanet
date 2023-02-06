import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from 'app/core/services/auth/auth.service';

@Component({
  selector: 'app-change-pass',
  templateUrl: './change-pass.component.html',
  styleUrls: ['./change-pass.component.css']
})
export class ChangePassComponent {

passForm :FormGroup;
disableSubmitButton = false;
disableActiveationButton = false;

constructor(private router:Router,private _formBuilder:FormBuilder,private auth:AuthService){
  this.passForm = this._formBuilder.group({
    pass: ['', [Validators.required]],
    repPass: ['', [Validators.required]]
  });
}

submit(){
  if (this.passForm.valid) {
    this.auth.changePassword(this.passForm.value.pass).subscribe({
      next:()=>{
        this.goToLogin();
      },
      error:()=>{
        return
      }
    });
  }
}

goToLogin(){
  this.router.navigate(['/'])
}
}
