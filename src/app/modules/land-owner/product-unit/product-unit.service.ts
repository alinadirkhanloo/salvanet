import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericApiService } from 'app/core/services/generic-api/generic-api.service';
import { environment } from 'environment/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductUnitService  extends GenericApiService<any> {
  constructor(http: HttpClient) {
      super(http,'productionUnit');
  }

  get landRecordType$():Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/baseinformation/landRecordType`);
  }
  get ownershipType$():Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/baseinformation/ownershipType`);
  }

  get productionUnitType$():Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/baseinformation/productionUnitType`);
  }

  get status$():Observable<any> {
    return this.http.get<any>(`${environment.baseUrl}/baseinformation/registrationStatus`);
  }

  

}
