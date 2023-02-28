import { Component, Input, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dynamic-navbar-menu',
  templateUrl: './dynamic-navbar-menu.component.html',
  styleUrls: ['./dynamic-navbar-menu.component.css']
})
export class DynamicNavbarMenuComponent implements OnInit {
  @Input()
  public items!: MenuItem[];

  ngOnInit() {
  }
}
