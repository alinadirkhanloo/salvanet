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

  public getChild(url: string,study:boolean=false): Observable<any>
  {
    return this.http.get<any>(`${environment.baseUrl}/${url}`).pipe(
      map( data =>{
        return study?this.convertToStudyTree(data,'title'):this.convertToTree(data)
      })
      );
  }

  public getStudiTree(url: string,lable:string='name'): Observable<any>
  {
    return this.http.get<any>(`${environment.baseUrl}/${url}`).pipe(
      map( data =>{
        return this.convertToStudyTree(data,lable)
      })
      );
  }

  public getTree(url: string,lable:string='name'): Observable<any>
  {
    return this.http.get<any>(`${environment.baseUrl}/${url}`).pipe(
      map( data =>{
        return this.convertToTree(data,lable)
      })
      );
  }

  convertToStudyTree(data:any,lable:string='name'){
    let treeData=[];
    if (data) {
      data.forEach(element => {
        treeData.push(
          {
            label:element[lable],
            data:element.id,
            leaf:element.studyFieldId?true:false,
            children:[]
          }
      );
      });
    }
    return treeData;

  }

  convertToTree(data:any,lable:string='name'){
    let treeData=[];
    if (data) {
      data.forEach(element => {
        treeData.push(
          {
            label:element[lable],
            data:element.id,
            leaf:element?.typeId>3 ?? false,
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
