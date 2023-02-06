import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericApiService } from 'app/core/services/generic-api/generic-api.service';
import { environment } from 'environment/environment';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DivisionsOfTheCountryService extends GenericApiService<any>{

  constructor(http: HttpClient) {
    super(http , 'api/app/base-information-header' )
  }


  get mockData$(): Observable<TreeNode[]>{
    return this.http.get<TreeNode[]>(`${environment.baseUrl}/tree`);
  }

}
