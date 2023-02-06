import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { environment } from 'environment/environment';

@Injectable()
export class DynamicSelectService {

  constructor(private http: HttpClient) { }

  public getList(url: string): Observable<any>
  {
    return this.http.get<any[]>(`${environment.baseUrl}/${url}`);
  }
}
