import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericApi } from 'app/core/interfaces/generic-api.interface';

@Injectable({
  providedIn: 'root'
})
export class CoursesService extends GenericApi {
  constructor(http: HttpClient) {
      super(http,'course-records');
  }
}