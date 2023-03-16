import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { GenericApiService } from 'app/core/services/generic-api/generic-api.service';
import { environment } from 'environment/environment';

@Injectable({
  providedIn: 'root'
})
export class InterestsWorkplaceService extends GenericApiService<any> {

  constructor(http:HttpClient) {
    super(http,'profile/assignFavoriteWorkplaces')
   }
}
