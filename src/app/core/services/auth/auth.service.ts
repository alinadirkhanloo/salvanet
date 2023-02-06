import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from 'core/interfaces/user.interface';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    user: BehaviorSubject<User>;

    constructor(private http: HttpClient) {
        this.user = new BehaviorSubject<User>(this.getItemFromLocalStorage('currentUser'));
    }
    
    login(userVAlue:any){
        const params = new HttpParams()
        .set('username', userVAlue.username)
        .set('password', userVAlue.password)
        .set('code', userVAlue.code);
        return this.http.get(`${environment.baseUrl}/auth/login`, { params: params });
    }

    // send id number and phone number for authentication and  send sms 
    checkAndSendSms(idNumber: string, phoneNumber: string): Observable<any> {
        const params = new HttpParams()
            .set('idNumber', idNumber)
            .set('phoneNumber', phoneNumber);
        return this.http.get(`${environment.baseUrl}/auth/check-user`, { params: params });
    }

    // resend for authentication
    resendSms(idNumber: string, phoneNumber: string, callback: any) :Observable<any> {
        callback();
        return this.checkAndSendSms(idNumber, phoneNumber);
    }

    // send code to verifiy phone number
    verifyCode(verificationCode: string, phoneNumber: string) {
        const params = new HttpParams()
            .set('phoneNumber', phoneNumber)
            .set('verificationCode', verificationCode);
        return this.http.get(`${environment.baseUrl}/auth/verify-code`, { params: params });
    }

    //save user at localstorage
    setUser(user: User) {
        this.user.next(user);
        localStorage.setItem('currentUser', JSON.stringify(this.user.value));
    }

    // get user value
    getUser(): User {
        return this.user.value ? this.user.value : null;
    }

    //get items from local storage with key
    getItemFromLocalStorage(key: string) {
        const item = localStorage.getItem(key);
        if (item) {
            return JSON.parse(item);
        } else { 
            //item does not exist so return null
            return null 
        }
    }

    changePassword(password:string){
    return this.http.post(`${environment.baseUrl}/auth/change-password`, { newPassword: password });
    }

    // remove user from localstorage and set our user observable to null
    logout() {
        localStorage.removeItem('currentUser');
        this.user.next(null);
    }

}
