import { environment } from 'environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericApiService } from 'app/core/services/generic-api/generic-api.service';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService extends GenericApiService<TreeNode>{

  constructor(http: HttpClient) {
    super(http , 'api/app/base-information-header' )
  }


  get mockData$(): Observable<TreeNode[]>{
    return this.http.get<TreeNode[]>(`${environment.baseUrl}/tree`);
  }

  getLists$(): Observable<any>{
    return this.http.get<any>(`${environment.baseUrl}/organization/position-history`);
  }

}
