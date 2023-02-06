import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericApiService } from 'app/core/services/generic-api/generic-api.service';
import { environment } from 'environment/environment';

@Injectable({
  providedIn: 'root'
})
export class AgriculturalExperiencesService extends GenericApiService<any> {

  constructor(http:HttpClient) {
    super(http,'baseInformation')
   }


   get agriculturalExperience$():Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/farmer/agricultural-experience`);
   }

}