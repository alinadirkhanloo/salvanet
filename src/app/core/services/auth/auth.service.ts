import { Router } from '@angular/router';
import { IPerson } from 'app/core/interfaces/person.interface';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { User } from 'core/interfaces/user.interface';
import { ICompany } from 'app/core/interfaces/company.interface';


@Injectable({
    providedIn: 'root'
})
export class AuthService {

    public isRefreshing: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    user: BehaviorSubject<User>;

    username$: Observable<string>;
    private usernameSubject: BehaviorSubject<string>;

    constructor(private http: HttpClient,private router:Router) {
        this.user = new BehaviorSubject<User>(this.getItemFromSessionStorage('currentUser'));
        this.usernameSubject = new BehaviorSubject<string>('');
        this.username$ = this.usernameSubject.asObservable();
    }

    setUsername(username: string) {
        this.usernameSubject.next(username);
    }

    getUsername() {
        return this.usernameSubject.value;
    }

    login(userVAlue: any) {
        return this.http.post(`${environment.authUrl}/authenticate`, userVAlue);
    }

    getCaptcha() {

        return this.http.get(`${environment.authUrl}/getCaptcha`, { responseType: 'text' });
    }

    submitPerson(person: IPerson) {
        return this.http.post(`${environment.baseUrl}/person`, person);
    }

    editPerson(url:string='',person: IPerson) {
        return this.http.put(`${environment.baseUrl}/person/${url}`, person);
    }

    getPerson(nationalCode: string) {
        return this.http.get(`${environment.baseUrl}/person/nationalCode/${nationalCode}`);
    }

    submitCompany(company: ICompany) {
        return this.http.post(`${environment.baseUrl}/company`, company);
    }


    // send id number and phone number for authentication and  send sms
    checkAndSendSms(datavalue: any): Observable<any> {
        // const params = new HttpParams()
        //     .set('idNumber', idNumber)
        //     .set('phoneNumber', phoneNumber);
        return this.http.post(`${environment.authUrl}/identityConfirmation`, datavalue);
    }

    sendSms(datavalue: any): Observable<any> {
        // const params = new HttpParams()
        //     .set('idNumber', idNumber)
        //     .set('phoneNumber', phoneNumber);
        return this.http.post(`${environment.baseUrl}/user/identityConfirmation`, datavalue);
    }
    
    sendCode(datavalue: any): Observable<any> {
        // const params = new HttpParams()
        //     .set('idNumber', idNumber)
        //     .set('phoneNumber', phoneNumber);
        return this.http.post(`${environment.baseUrl}/user/identityConfirmation`, datavalue);
    }

    // resend for authentication
    // resendSms(idNumber: string, phoneNumber: string, callback: any) :Observable<any> {
    //     callback();
    //     return this.checkAndSendSms(idNumber, phoneNumber);
    // }

    // send code to verifiy phone number
    verifyCode(verificationCode: string, phoneNumber: string) {
        const params = new HttpParams()
            .set('phoneNumber', phoneNumber)
            .set('verificationCode', verificationCode);
        return this.http.get(`${environment.authUrl}/verify-code`, { params: params });
    }

    //save user at localstorage
    setUser(user: User) {
        this.user.next(user);
        sessionStorage.setItem('currentUser', JSON.stringify(this.user.value));
    }

    // get user value
    getUser(): User {
        return this.user.value ? this.user.value : null;
    }

    //get items from local storage with key
    getItemFromSessionStorage(key: string) {
        const item = sessionStorage.getItem(key);
        if (item) {
            return JSON.parse(item);
        } else {
            //item does not exist so return null
            return null
        }
    }

    changePassword(username: string, password: string) {


        let userTemp = { id: null, ownerId: 0, userName: username, password: password };
        return this.http.put(`${environment.baseUrl}/account/changePassword`, userTemp);
    }


    accountActivation(username: string, password: string) {
        let userTemp = { id: null, ownerId: 0, userName: username, password: password };
        return this.http.put(`${environment.baseUrl}/account/activate`, userTemp);
    }

    // remove user from localstorage and set our user observable to null
    logout() {

        this.http.get(`${environment.baseUrl}/user/logout1`).subscribe(result => {

                sessionStorage.removeItem('currentUser');
                sessionStorage.removeItem('currentRole');
                sessionStorage.clear()
                this.router.navigateByUrl('auth/login');

         });

        // this.user.next(null);
    }

    refreshToken(): Observable<any> {
        this.isRefreshing.next(true);
        return this.http.post(`${environment.baseUrl}/user/refreshTokens`,{});
    }
}
