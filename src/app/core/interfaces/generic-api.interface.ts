import { Observable } from 'rxjs';
import { environment } from 'environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
export class GenericApi {
    restUrl:string='';
    constructor(private http: HttpClient, restUrl:string){
        this.restUrl = restUrl;
    }

    // R => CRUD
    getList() :Observable<any>{
        return this.http.get<any>(`${environment.baseUrl}/${this.restUrl}`);
    }

    getById(id:string|number) :Observable<any>{
        return this.http.get<any>(`${environment.baseUrl}/${this.restUrl}/${id}`);
    }

    // R => CRUD
    insert(entity:any) :Observable<any>{
        return this.http.post<any>(`${environment.baseUrl}/${this.restUrl}/insert`, entity);
    }

    // R => CRUD
    update(id:string|number,entity) :Observable<any>{
        return this.http.get<any>(`${environment.baseUrl}/${this.restUrl}/update/${id}`,entity);
    }

    // R => CRUD
    delete(id:number|string) :Observable<any>{
        return this.http.get<any>(`${environment.baseUrl}/${this.restUrl}/delete/${id}`);
    }
}