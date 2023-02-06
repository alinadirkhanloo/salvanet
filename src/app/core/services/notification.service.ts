// import { Observable, BehaviorSubject } from 'rxjs';
// import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
// import { Injectable } from '@angular/core';

// @Injectable({
//     providedIn: 'root',
// })
// export class NotificationService {

//     private headers: HttpHeaders;
//     private userId = 0;
//     notifs: BehaviorSubject<any> = new BehaviorSubject<any>(null);
//     notifsCounter: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
//     timer:any=null;
    
//     constructor(private http: HttpClient) {
//         this.headers = new HttpHeaders();
//         this.headers.append('Content-Type', 'json/application');
//     }

//     getNotifs(userId: number) {
//         this.timer = setInterval(() => {

//             if (this.notifsCounter.value) {
//                 this.getAllNotifications(userId).subscribe({
//                     next: (res) => {
//                         this.notifs.next(res[0]);
//                     }
//                 });
//             }
//         }, 3000)
//     }
//     // User Info  -----------------

//     getAllNotifications(id: number) {

//         const params = new HttpParams()
//             .set('attorneyId', id);

//         return this.http.get<any>(`${environment.baseUrl}/consultation/find-all-payed`,
//             { params: params });
//     }

//     setAttrony(coId:number,id: number) {
//         const params = new HttpParams()
//             .set('consultationId', coId)
//             .set('attorneyId', id);

//         return this.http.get<any>(`${environment.baseUrl}/consultation-api/updateAttorney`,
//             { params: params });
//     }


// }



