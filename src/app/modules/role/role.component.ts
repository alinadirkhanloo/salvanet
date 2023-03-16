
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { RoleService } from './role.service';

export interface Role {
  title: string;
  value: boolean;
}


@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css']
})
export class RoleComponent implements OnInit {
  farmer = 0;
  productOwner = 0;
  productSentinel = 0;
  foodSecuritySentinel = 0;
  coach = 0;



  constructor(
    public dialogService: DialogService,
    private router: Router,
    private roleService: RoleService
  ) { }

  ngOnInit() { }

  submit() { }

  goToFarmerSignUpForm(event) {
      this.router.navigate(['/pages/farmer-registration']);

  }

  goToProductWatchreSignUpForm(event) {
      this.router.navigate(['/pages/production-watch-registration']);

  }

  goToSecWatcherSignUpForm(event) {
      this.router.navigate(['/pages/food-security-watch-registration']);

  }

  goToProductUnitSignUpForm(event) {
      this.router.navigate(['/pages/product-owner-registration']);

  }

  goToCouchSignUpForm(event) {
      this.router.navigate(['/pages/coach-registration']);

  }

}
