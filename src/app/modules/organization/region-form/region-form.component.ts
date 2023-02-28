import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { OrganizationService } from '../organization.service';

@Component({
  selector: 'app-region-form',
  templateUrl: './region-form.component.html',
  styleUrls: ['./region-form.component.css']
})
export class RegionFormComponent {
  products=[
    {name:'afa'},
    {name:'afa'},
  ]

  landId=0;
  landTitle='';
  private sub = new Subscription();

  constructor(private router:Router,private oService:OrganizationService){

  }

  submit(){

  }

  cancle(){
    this.router.navigate(['/pages/organization']);
  }
}
