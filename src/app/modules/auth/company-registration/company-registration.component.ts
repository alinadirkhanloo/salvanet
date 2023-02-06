import { Router } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.css']
})
export class CompanyRegistrationComponent {
  products=[
    {id:'1',topic:'asfaf'}
  ];


  constructor(private router:Router){}

  goToLogin(){
    this.router.navigate(['/']);
  }
}
