import { Location } from '@angular/common';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input } from '@angular/core';
import { RoleList } from 'app/core/constants/roles.constant';
import { RolesService } from 'app/shared/services/role.service';

@Component({
  selector: 'app-role-selector',
  templateUrl: './role-selector.component.html',
  styleUrls: ['./role-selector.component.css']
})
export class RoleSelectorComponent {
  selectedRole=null;
  roleList=[];
  constructor( private activeModal:NgbActiveModal,private roleService:RolesService){

    let temp = this.roleService.getRoles();
    this.roleList=RoleList.filter(item=> temp.includes(item.name));
  }

  selectRole(role:string){
    this.activeModal.close(role);
    this.roleService.saveCurrentRole(role);
  }
}
