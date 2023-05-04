import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  public topMenuItems: MenuItem[];


  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    this.initialToMenuBar();
  }


  initialToMenuBar() {
    this.topMenuItems = [
      {
        label: 'دوره های آموزشی',
        icon: 'las la-info fs-20',

        command: event => {
          this.navigateTo('pages/cources');
        },
      },
    ];
  }


  navigateTo(url: string) {
    this.router.navigate([url], { relativeTo: this.route });
  }
}


