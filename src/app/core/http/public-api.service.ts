import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { User } from 'core/interfaces/user.interface';

@Injectable({
    providedIn: 'root',
})
export class PublicApiesService {

    private headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'json/application');
    }


    // getUserInfo(): Observable<User> {
    //     return this.http.get<User>(`${environment.baseUrl}/user/find`);
    // }

    // getHomePageData(): Observable<any> {
    //     return this.http.get<any>(`${environment.baseUrl}/public/get-all`);
    // }

    // getAllAttorneyWithSpecFilter(specId:number): Observable<Attorney[]> {
    //     const params = new HttpParams()
    //         .set('specId', specId);
    //     return this.http.get<Attorney[]>(`${environment.baseUrl}/user/attorney/find-all`,{params:params});
    // }


    
}



