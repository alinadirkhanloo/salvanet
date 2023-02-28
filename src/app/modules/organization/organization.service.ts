import { environment } from 'environment/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericApiService } from 'app/core/services/generic-api/generic-api.service';
import { TreeNode } from 'primeng/api';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService extends GenericApiService<any>{

  constructor(http: HttpClient) {
    super(http , 'organization' )
  }

}
