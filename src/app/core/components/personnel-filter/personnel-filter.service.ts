import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { GenericApiService } from 'core/services/generic-api/generic-api.service';
import { environment } from 'environment/environment';
import { IDynamicSelectItem } from 'app/core/components/dynamics/dynamic-select/dynamic-select.interface';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PersonnelFilterService extends GenericApiService<any>{


  constructor(http: HttpClient) {
    super(http , 'api/app/base-personel')
  }


  public getBaseInfosById(id: string | number, afterIdUrl:string=''): Observable<any>
  {
    return this.http.get<any>(`${environment.baseUrl}/api/divisionCountry/${id}/${afterIdUrl ?? ''}`);
  }

}
