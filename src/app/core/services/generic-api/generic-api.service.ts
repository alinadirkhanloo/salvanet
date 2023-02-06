import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export abstract class GenericApiService <T>
  {

    protected constructor(
      protected http: HttpClient,
      protected restUrl: string
    )
      {
      }

    // C => CRUD
    public create(entity: any , concatUrl: string = ''): Observable<T>
      {
        return this.http.post<T>(`${environment.baseUrl}/${this.restUrl}/${concatUrl}`, entity);
      }

    // R => CRUD
    public readList(concatUrl: string = ''): Observable<T[]>
      {
        return this.http.get<T[]>(`${environment.baseUrl}/${this.restUrl}/${concatUrl}`);
      }

    public readById(id: string | number , afterIdUrl = ''): Observable<T>
      {
        return this.http.get<T>(`${environment.baseUrl}/${this.restUrl}/${id}/${afterIdUrl}`);
      }

    // U => CRUD
    public update(id: string | number, entity , afterIdUrl = ''): Observable<T>
      {
        return this.http.put<T>(`${environment.baseUrl}/${this.restUrl}/${id}/${afterIdUrl}`, entity);
      }

    // D => CRUD
    public delete(id: number | string , afterIdUrl = ''): Observable<T>
      {
        return this.http.delete<T>(`${environment.baseUrl}/${this.restUrl}/${id}/${afterIdUrl}`);
      }

  }
