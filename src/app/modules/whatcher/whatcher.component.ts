import { Component, OnInit, OnDestroy } from '@angular/core';
import { GenericClass } from 'app/core/models/genericClass.model';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-whatcher',
  templateUrl: './whatcher.component.html',
  styleUrls: ['./whatcher.component.css'],
})
export class WhatcherComponent extends GenericClass implements OnInit, OnDestroy {
  items: MenuItem[];

  constructor() {
    super();
  }

  ngOnInit() {
    this.items = [
      {
        label: 'مهارت های نرم افزاری',
        routerLink: 'software-skills',
      },
      {
        label: 'مهارت های اجتماعی',
        routerLink: 'social-skills',
      },
      {
        label: 'سوابق تحصیلی',
        routerLink: 'education-records',
      },
      {
        label: 'سوابق شغلی',
        routerLink: 'job-records',
      },

      {
        label: 'عضویت در سازمان ها',
        routerLink: 'membership',
      },
      {
        label: 'دوره ها و مهارت ها',
        routerLink: 'courses',
      },
      {
        label: 'سوابق پژوهشی',
        routerLink: 'research-activities',
      },
      {
        label: 'تکمیل پروفایل',
        routerLink: 'confirmation',
      },
    ];
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
