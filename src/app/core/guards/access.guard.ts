;
import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { AuthService } from 'core/services/auth/auth.service';


@Injectable({ providedIn: 'root' })
export class AccountGuard implements CanActivate {
    constructor(
        private authenticationService: AuthService, private router: Router
    ) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

        const currentUser = this.authenticationService.getItemFromLocalStorage('currentUser');
        if (!currentUser) {
            // logged in so return true
            this.router.navigate(['/auth/login']);
            return false;

        }
        // not logged in so redirect to login page with the return url
        return true;
    }
}