import { GenericApi } from 'app/core/interfaces/generic-api.interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThesisService extends GenericApi {
  constructor(http: HttpClient) {
      super(http,'thesis');
  }
}


