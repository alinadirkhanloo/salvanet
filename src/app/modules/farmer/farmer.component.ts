import { Component, OnInit, OnDestroy } from '@angular/core';
import { GenericClass } from 'app/core/models/genericClass.model';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.css']
})
export class FarmerComponent extends GenericClass implements OnInit, OnDestroy {

  items: MenuItem[];


  constructor() { super(); }

  ngOnInit() {
    this.items = [{
      label: 'علاقه مندی های محل کار',
      routerLink: 'interests-workplace'
    },
    {
      label: 'تجارب کشاورزی',
      routerLink: 'agricultural-experiences'
    },
    {
      label: 'علاقه مندی های کشاورزی',
      routerLink: 'agricultural-interests'
    },
    {
      label: 'تکمیل پروفایل',
      routerLink: 'confirmation'
    }
    ];

  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
