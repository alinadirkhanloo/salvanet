import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericApiService } from 'app/core/services/generic-api/generic-api.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JihadiGroupService extends GenericApiService<any>{

  constructor(http: HttpClient) {
    super(http , 'api/app/base-information-header' )
  }


  get mockData$(): Observable<any>{
    return this.http.get<any>(`http://0.0.0.0:3001/tree`);
  }

  getLists$(): Observable<any>{
    return this.http.get<any>(`http://0.0.0.0:3001/organization/position-history`);
  }

}
