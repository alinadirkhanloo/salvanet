
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { RoleService } from './role.service';

export interface Role{
  title:string;
  value:boolean;
}


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  farmer=0;
  productOwner=0;
  productSentinel=0;
  foodSecuritySentinel=0;
  coach=0;



  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router: Router,
    private roleService: RoleService
  ) { }

  ngOnInit() {}

  submit() {}

  goToFarmerSignUpForm(event){
    if (event?.checked) {
      this.router.navigate(['farmer']);
    }
  }

  goToProductWatchreSignUpForm(event){
    if (event?.checked) {
      this.router.navigate(['farmer']);
    }
  }

  goToSecWatcherSignUpForm(event){
    if (event?.checked) {
      this.router.navigate(['farmer']);
    }
  }

  goToProductUnitSignUpForm(event){
    if (event?.checked) {
      this.router.navigate(['farmer']);
    }
  }

  goToCouchSignUpForm(event){
    if (event?.checked) {
      this.router.navigate(['farmer']);
    }
  }

}
