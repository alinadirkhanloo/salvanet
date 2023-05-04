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
            data:element.id,
            leaf:element.typeId>3,
            children:[]
          }
      );
      });
    }
    return treeData;

  }

   checkCodeMelli(code:string) {
      if (code.length !== 10 || /(\d)(\1){9}/.test(code)) return false;
  
      let sum = 0,
          chars = code.split(''),
          lastDigit,
          remainder;
  
      for (let i = 0; i < 9; i++) sum += +chars[i] * (10 - i);
      
      remainder = sum % 11;
      lastDigit = remainder < 2 ? remainder : 11 - remainder;
  
      return +chars[9] === lastDigit;
  };
  
}
