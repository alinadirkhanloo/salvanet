import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericApiService } from 'app/core/services/generic-api/generic-api.service';

export interface IFarmer {
    id: number,
    submitDate: string,
    resultDate: string,
    resultId: number,
    workplaceId: number,
    employmentId: number,
    registrationResultId: number,
    farmerId: number
}

@Injectable({
    providedIn: 'root'
})
export class FarmerService extends GenericApiService<any> {

    farmer:IFarmer = {
        employmentId:null,
        farmerId:null,
        id:null,
        registrationResultId:null,
        resultDate:null,
        resultId:null,
        submitDate:null,
        workplaceId:null
    };
    constructor(http: HttpClient) {
        super(http, 'farmer')
    }

    setWorkPlace(farmer:IFarmer){
        this.farmer = farmer;
    }

    getFarmer():IFarmer{
        return this.farmer;
    }


}
