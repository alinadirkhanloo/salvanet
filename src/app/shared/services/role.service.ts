import { HttpHeaders, HttpClient } from '@angular/common/http';
import { environment } from 'environment/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from 'app/core/interfaces/user.interface';
// import { OAuthService } from 'angular-oauth2-oidc';

@Injectable({
  providedIn: 'root'
})
export class RolesService {

  private roles: string[] = [];
  currentRole: string = '';
  private headers: HttpHeaders;
  constructor(private http: HttpClient) {
    this.headers = new HttpHeaders();
    this.headers.append('Content-Type', 'json/application');

    const currentUser: User = this.getItemFromSessionStorage('currentUser');
    const isLoggedIn = currentUser && currentUser.accessToken;
    if (isLoggedIn) {
      let roles = JSON.parse(currentUser.idToken).roles;
      if (roles) {
        this.setRoles(roles);
      }
    }
    this.currentRole = sessionStorage.getItem('currentRole');

  }

  hasRole(role: string): boolean {
    if (!!this.roles) {
      const userRoles = this.roles;
      return userRoles.includes(role) && this.currentRole === role;
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

  saveCurrentRole(role: string) {
    this.setActiveRole(role).subscribe({
      next: (result) => {
        if (result) {
          this.currentRole = role;
          sessionStorage.setItem('currentRole', role);
          location.reload();
        }
      }
    });


  }

  numberOfRoles() {
    return this.roles.length;
  }

  getRoles() {
    return this.roles;
  }

  setActiveRole(role: string): Observable<boolean> {
    return this.http.post<boolean>(`${environment.baseUrl}/account/setActiveRole`, { role: role });
  }

}