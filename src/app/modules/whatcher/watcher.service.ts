import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericApiService } from 'app/core/services/generic-api/generic-api.service';
import { environment } from 'environment/environment';

@Injectable({
  providedIn: 'root'
})
export class WatcherService extends GenericApiService<any> {

  constructor(http:HttpClient) {
    super(http,'profile')
   }

   get educationLevels$():Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/educationLevel`);
   }
}
