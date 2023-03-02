import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-research-activities',
  templateUrl: './research-activities.component.html',
  styleUrls: ['./research-activities.component.css']
})
export class ResearchActivitiesComponent {


  items: MenuItem[];

  activeItem: MenuItem;

  ngOnInit() {
    
      this.items = [
          {label: 'پایان نامه ها', routerLink:'thesises'},
          {label: 'مقاله ها', routerLink:'articles'},
          {label: 'کتاب ها', routerLink:'books'},
          {label: 'سوابق تدریس', routerLink:'teaching-records'},
          {label: 'اختراع', routerLink:'inventions'}
      ];

      this.activeItem = this.items[0];
  }
}