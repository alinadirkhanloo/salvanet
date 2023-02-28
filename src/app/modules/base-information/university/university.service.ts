import { GenericApiService } from 'app/core/services/generic-api/generic-api.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UniversityService extends GenericApiService<any> {

  constructor(http:HttpClient) {
    super(http,'university')
   }
}
