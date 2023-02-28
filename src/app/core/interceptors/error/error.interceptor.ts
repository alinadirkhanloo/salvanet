import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
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
            
            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                this.router.navigate(['/login']);

            } else if (err.status === 500) {

                this.shService.showError("سرور با خطا مواجه شده است لطفا مجددا تلاش نمایید");

            } else if (err.status === 0) {

                this.shService.showError("خطا در ارتباط با سرور . لطفا اینترنت خود را بررسی نمایید");

            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }

    showError(msg: string) {
        
    }
}