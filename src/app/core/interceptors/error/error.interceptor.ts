import { User } from 'app/core/interfaces/user.interface';
import { AuthenticateErrors } from 'app/core/enums/errors.enum';
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, map } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { AuthService } from 'core/services/auth/auth.service';
import { Router } from '@angular/router';
import { SharedService } from 'app/shared/services/shared.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(
        private authenticationService: AuthService,
        private shService:SharedService,
        private router: Router) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        // handel apies response error
        return next.handle(request).pipe(catchError(err => {
              if (
                err instanceof HttpErrorResponse &&
                err.status === 401
            ) {
                if (err.error[0] === 'JwtTokenIsExpired') {
                    this.authenticationService.refreshToken().subscribe(
                        {
                            next:(user: User) => {

                                if (user && user.accessToken) {
                                    let currentUser:User = JSON.parse(sessionStorage.getItem('currentUser'));
                                    currentUser.accessToken = user.accessToken;
                                    currentUser.refreshToken = user.refreshToken;
                                    sessionStorage.setItem('currentUser', JSON.stringify(currentUser));
                                    this.authenticationService.isRefreshing.next(false);
                                    // return next.handle(request);
                                }

                            },
                            error:(err)=> {
                                sessionStorage.removeItem('currentUser');
                                sessionStorage.removeItem('currentRole');
                                sessionStorage.clear()
                                this.router.navigate(['auth/login']);
                            },
                        }
                    );
                } else if (err.error[0] === 'Unauthorized'){
                    sessionStorage.removeItem('currentUser');
                    sessionStorage.removeItem('currentRole');
                    sessionStorage.clear()
                                this.router.navigate(['auth/login']);
                }


            }
            if (err.status === 401) {
                this.shService.showError(AuthenticateErrors[err.error[0]]);
            } else
            if (err.status === 500) {

                this.shService.showError(AuthenticateErrors[err.error[0]]);

            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }

    showError(msg: string) {

    }


}
