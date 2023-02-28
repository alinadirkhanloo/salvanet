import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environment/environment';
import { GenericApiService } from 'app/core/services/generic-api/generic-api.service';

@Injectable({
  providedIn: 'root'
})
export class EducationalRecordsService extends GenericApiService<any> {

  constructor(http:HttpClient) {
    super(http,'educationalBackground')
   }


   get educationLevels$():Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/baseinformation/educationLevel`);
   }

}
