import { GenericApiService } from 'app/core/services/generic-api/generic-api.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';

@Injectable({
    providedIn: 'root',
})
export class RegistrationAnnouncementService extends GenericApiService<any>{

    constructor(http: HttpClient) {
      super(http , 'registrationAnnouncement' )
    }


    get roles$(): Observable<any>{
        return this.http.get(`${environment.baseUrl}/role`);
      }
}



