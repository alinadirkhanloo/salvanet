import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse, HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';
import { AuthService } from 'app/core/services/auth/auth.service';
import { environment } from 'environment/environment.prod';
import {User} from 'core/interfaces/user.interface';
import { SharedService } from 'app/shared/services/shared.service';
import { AuthenticateErrors } from 'app/core/enums/errors.enum';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService,private shService:SharedService,
        private router :Router) { }

    private isRefreshing = false;

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const currentUser:User = this.authenticationService.getItemFromSessionStorage('currentUser');
        const isLoggedIn = currentUser && currentUser.accessToken;
        // add token just for api calls
        const isApiUrl = request.url.startsWith(environment.baseUrl);

        if (isLoggedIn && isApiUrl) {
        request = this.setToken(request, this.authenticationService.isRefreshing.value?
          currentUser.refreshToken:currentUser.accessToken);

            // add token to header
            // request = request.clone({
            //     setHeaders: {
            //         Authorization: `Bearer ${currentUser.accessToken}`
            //     }
            // });
          //   .clone({
          //     // withCredentials: true //cookie
          // });
        }

        return next.handle(request);
    }


  public handle401Error(request: HttpRequest<any>, next: HttpHandler) {
    if (!this.isRefreshing) {
      this.isRefreshing = true;
      const currentUser:User = this.authenticationService.getItemFromSessionStorage('currentUser');
      const isLoggedIn = currentUser && currentUser.accessToken;
      if (isLoggedIn) {
        return this.authenticationService.refreshToken().pipe(
          map(() => {
            this.isRefreshing = false;
            // add token to header
            request = request.clone({
              setHeaders: {
                  Authorization: `Bearer ${currentUser.accessToken}`
              }
            }).clone({
            // withCredentials: true
            });
            return next.handle(request);
          }),
          catchError((error) => {
            this.isRefreshing = false;

            if (error.status == '403') {
              this.router.navigate(['auth/login']);
            }

            return throwError(() => error);
          })
        );
      }
    }

    return next.handle(request);
  }

  private setToken(request: HttpRequest<any>, token: string): HttpRequest<any> {
    return request.clone({ setHeaders: { Authorization: `Bearer ${token}` } });
  }

 
  
    getAuthToken() : string {
    let currentUser = JSON.parse(localStorage.getItem('currentUser'));
  
     if(currentUser != null) {
    return currentUser.accessToken;
    }
  
    return '';
    }
}



