import { HttpClient } from '@angular/common/http';
import { GenericApiService } from 'app/core/services/generic-api/generic-api.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LandsService extends GenericApiService<any> {

  constructor(http:HttpClient) {
    super(http,'lands')
   }
}
