import { HttpClient } from '@angular/common/http';
import { GenericApiService } from 'app/core/services/generic-api/generic-api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FarmerService extends GenericApiService<any> {

  constructor(http:HttpClient) {
    super(http,'farmers')
   }
}
