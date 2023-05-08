import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RoleSelectorComponent } from 'app/core/components/role-selector/role-selector.component';
import { RolesService } from 'app/shared/services/role.service';
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
  roleSelected = false;
  showLoading: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(true);
  constructor(public sharedService: SharedService,
    private roleService: RolesService,
    private modalService: NgbModal) {

  }

  ngOnInit(): void {
    setTimeout(() => {
      this.showLoading.next(false);
      if (this.roleService.currentRole === null) {
        if (this.roleService.numberOfRoles() > 1) {
          this.openRoleSelector();
        } else {
          this.roleService.saveCurrentRole(this.roleService.getRoles()[0]);
          this.roleSelected = true;
        }
      }else{
        this.roleSelected = true;
      }
    }, 300);

  }

  openRoleSelector() {
    let modal = this.modalService.open(RoleSelectorComponent, {
      size: 'lg',
      backdrop: 'static',
      keyboard: false
    });
    modal.result.then(res => {
      if (res !== null) {
        this.roleSelected = true;
      }
    });
  }



}
