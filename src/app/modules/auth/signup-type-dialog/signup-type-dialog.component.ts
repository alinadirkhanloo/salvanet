import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-signup-type-dialog',
  templateUrl: './signup-type-dialog.component.html',
  styleUrls: ['./signup-type-dialog.component.css']
})
export class SignupTypeDialogComponent {

  constructor(private router:Router){}

  goToLogin(){
    this.router.navigate(['/']);
  }

  goToCompany(){
    this.router.navigate(['/auth/company-registration']);
  }

}
