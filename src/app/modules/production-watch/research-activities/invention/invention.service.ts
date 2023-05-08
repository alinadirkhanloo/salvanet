import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericApiService } from 'app/core/services/generic-api/generic-api.service';

@Injectable({
  providedIn: 'root'
})
export class InventionService extends GenericApiService<any> {

  constructor(http:HttpClient) {
    super(http,'invention')
   }
}
