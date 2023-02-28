import { GenericApiService } from 'app/core/services/generic-api/generic-api.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class SimCardService extends  GenericApiService<any> {
    constructor(http: HttpClient) {
        super(http,'sim-card');
    }
}



