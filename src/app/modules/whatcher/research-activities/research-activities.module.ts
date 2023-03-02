import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ResearchActivitiesRoutingModule } from './research-activities-routing.module';
import { ResearchActivitiesComponent } from './research-activities.component';
import { SharedModule } from 'app/shared/modules/shared.module';


@NgModule({
  declarations: [
    ResearchActivitiesComponent
  ],
  imports: [
    SharedModule,
    ResearchActivitiesRoutingModule
  ]
})
export class ResearchActivitiesModule { }
