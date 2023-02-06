import { GenericApi } from './../../../../core/interfaces/generic-api.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class EducationalRecordsService extends GenericApi {
  constructor(http: HttpClient) {
      super(http,'educational-records');
  }
}