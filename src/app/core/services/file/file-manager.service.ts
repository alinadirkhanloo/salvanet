import { Observable } from 'rxjs';
import { HttpHeaders, HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environment/environment';
import { User } from 'core/interfaces/user.interface';

@Injectable({
    providedIn: 'root',
})
export class PublicApiesService {

    private headers: HttpHeaders;

    constructor(private http: HttpClient) {
        this.headers = new HttpHeaders();
        this.headers.append('Content-Type', 'json/application');
    }
 
    // select file and set to upload form data.
    pickFile($event: any) {

        const file: File = $event.target.files[0];
        if (file) {
          const formData = new FormData();
          formData.append("file", file);
          return this.UploadFile(formData);
        } else return null;
    
      }
    
    // upload selected file
    UploadFile(file: any): Observable<any> {
        const myheaders = new HttpHeaders();
        /** In Angular 5, including the header Content-Type can invalidate your request */
        myheaders.append('Content-Type', 'multipart/form-data');
        myheaders.append('Accept', 'application/json');
        return this.http.post<any>(`${environment.baseUrl}/core/file/upload`, file , {headers: myheaders});
    }
    
}



