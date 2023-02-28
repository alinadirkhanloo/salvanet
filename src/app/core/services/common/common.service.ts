import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
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

  public getChild(url: string): Observable<any>
  {
    return this.http.get<any>(`${environment.baseUrl}/${url}`).pipe(
      map( data =>{
        return this.convertToTree(data)
      })
      );
  }

  public getTree(url: string): Observable<any>
  {
    return this.http.get<any>(`${environment.baseUrl}/${url}`).pipe(
      map( data =>{
        return this.convertToTree(data)
      })
      );
  }

  convertToTree(data:any){
    let treeData=[];
    if (data) {
      data.forEach(element => {
        treeData.push(
          {
            label:element.name,
            data:element.code,
            leaf:element.typeId>3,
            children:[]
          }
      );
      });
    }
    return treeData;
  }
}
