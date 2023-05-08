import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';

@Injectable()
export abstract class GenericApiService<T>
{
  private params = new HttpParams();
  protected constructor(
    protected http: HttpClient,
    protected restUrl: string
  ) {
  }

  // C => CRUD
  public create(entity: any, concatUrl: string = '',url:string=''): Observable<T> {
    return this.http.post<T>(`${environment.baseUrl}/${url?url:this.restUrl}/${concatUrl}`, entity);
  }

  // R => CRUD
  public readList(concatUrl: string = '',url:string=''): Observable<T[]> {

    return this.http.get<T[]>(`${environment.baseUrl}/${url?url:this.restUrl}/${concatUrl}`);
  }

  public readListWithParams(page:number,size:number,sort?:string,concatUrl: string = '',restUrl:string=''): Observable<T[]> {
    this.params = new HttpParams()
    .set('page',page)
    .set('size', size)
    .set("sort", sort?sort:'');
    let url = restUrl?restUrl:this.restUrl;
    return this.http.get<T[]>(`${environment.baseUrl}/${url}/${concatUrl}`,{params:this.params});
  }

  public getListCount(afterIdUrl = ''): Observable<T> {
    return this.http.get<T>(`${environment.baseUrl}/${this.restUrl}/${afterIdUrl}`);
  }

  public readById(id: string | number, afterIdUrl = '',url:string=''): Observable<T> {
    return this.http.get<T>(`${environment.baseUrl}/${url?url:this.restUrl}/${id}/${afterIdUrl}`);
  }

  // U => CRUD
  public update(entity, afterIdUrl = '',url:string=''): Observable<T> {
    return this.http.put<T>(`${environment.baseUrl}/${url?url:this.restUrl}/${afterIdUrl}`, entity);
  }

  // D => CRUD
  public delete(id: number | string, afterIdUrl = '',url:string=''): Observable<T> {
    return this.http.delete<T>(`${environment.baseUrl}/${url?url:this.restUrl}/${id}/${afterIdUrl}`);
  }
  public deleteWithoutId( afterIdUrl = '',url:string=''): Observable<T> {
    return this.http.delete<T>(`${environment.baseUrl}/${url?url:this.restUrl}/${afterIdUrl}`);
  }

}
