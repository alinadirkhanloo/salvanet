import { HttpClient } from '@angular/common/http';
import { GenericApi } from 'app/core/interfaces/generic-api.interface';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductUnitService  extends GenericApi {
  constructor(http: HttpClient) {
      super(http,'product-unit');
  }
}