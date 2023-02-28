import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericApiService } from 'app/core/services/generic-api/generic-api.service';
import { environment } from 'environment/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DivisionsOfTheCountryService extends GenericApiService<any> {

  constructor(http:HttpClient) {
    super(http,'countryDivision')
   }

  get mockData$(): Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/countryDivision`);
  }

  get types$(): Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/countryDivisionType`);
  }

}
