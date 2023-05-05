import { Injectable } from '@angular/core';
import { User } from 'app/core/interfaces/user.interface';
// import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private roles: string[] = [];

  constructor() {
    const currentUser: User = this.getItemFromSessionStorage('currentUser');
    const isLoggedIn = currentUser && currentUser.accessToken;
    if (isLoggedIn) {
      let roles = JSON.parse(currentUser.idToken).roles;
      if (roles) {
        this.setRoles(roles);
      }
    }
  }

  hasRole(role: string): boolean {
    if (!!this.roles) {
      const userRoles = this.roles;
      return userRoles.includes(role);
    }
  }

  setRoles(roles: string) {
    if (!!roles) {
      this.roles = roles.split(',');
    }
  }
  getItemFromSessionStorage(key: string) {
    const item = sessionStorage.getItem(key);
    if (item) {
      return JSON.parse(item);
    } else {
      //item does not exist so return null
      return null
    }
  }

  }