import { RolsUrl, RolsUrls } from './../constants/role-urls.constant';
;
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { RolesService } from 'app/shared/services/role.service';


@Injectable({ providedIn: 'root' })
export class RoleGuard implements CanActivate {

    urlsRoles: RolsUrl[] = RolsUrls;
    constructor(
        private roleService: RolesService
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const currentRole = this.roleService.currentRole;
        console.log(state.url, currentRole);
        const neededRole:RolsUrl = this.urlsRoles.find((item) => {return item.url === state.url});
        console.log(neededRole);
        
        if (!neededRole.roles.includes(currentRole)) {
            return false;
        }
        // not logged in so redirect to login page with the return url
        return true;
    }
}