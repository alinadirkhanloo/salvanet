import { GenericApi } from 'app/core/interfaces/generic-api.interface';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AppointmentService extends GenericApi {
  constructor(http: HttpClient) {
      super(http,'company');
  }
}
