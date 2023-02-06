import { Component, OnInit } from '@angular/core';
import { SharedService } from 'app/shared/services/shared.service';
import { BehaviorSubject } from 'rxjs';
@Component({
  selector: 'app-page-container',
  templateUrl: './page-container.component.html',
  styleUrls: ['./page-container.component.css']
})
export class PageContainerComponent implements OnInit {
  title = 'Jahad';
  navSidebarClass: boolean = true;
  hamburgerClass: boolean = false;
  showLoading : BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
    constructor(public sharedService: SharedService) {

    }

  ngOnInit(): void {
    setTimeout(() => {
      this.showLoading.next(false);
    }, 300);
  }

}
