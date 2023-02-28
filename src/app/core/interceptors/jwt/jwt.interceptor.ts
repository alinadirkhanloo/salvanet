
import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from 'app/core/services/auth/auth.service';
import { environment } from 'environment/environment.prod';
import {User} from 'core/interfaces/user.interface';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add auth header with jwt if user is logged in and request is to the api url
        const currentUser:User = this.authenticationService.getItemFromSessionStorage('currentUser');
        const isLoggedIn = currentUser && currentUser.accessKey;
        // add token just for api calls
        const isApiUrl = request.url.startsWith(environment.baseUrl);

        if (isLoggedIn && isApiUrl) {
            // add token to header
            request = request.clone({
                setHeaders: {
                    Authorization: `Bearer ${currentUser.accessKey}`
                }
            }).clone({
              withCredentials: true
          });
        }

        return next.handle(request);
    }
}
