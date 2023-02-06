import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { HttpClient } from '@angular/common/http';
import { environment } from 'environment/environment';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class CommonService
{

  constructor(private http: HttpClient)
  {
  }

  public getChild(url: string): Observable<TreeNode[]>
  {
    return this.http.get<TreeNode[]>(`${environment.baseUrl}/${url}`);
  }
}
