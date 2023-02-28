import { AgriculturalInterestsModule } from './agricultural-interests/agricultural-interests.module';
import { InterestsWorkplaceModule } from './interests-workplace/interests-workplace.module';
import { PrimeNgModule } from 'app/shared/modules/primeng/primeng.module';
import { DynamicSelectModule } from 'core/components/dynamics/dynamic-select/dynamic-select.module';
import { NgModule } from '@angular/core';

import { FarmerRoutingModule } from './farmer-routing.module';
import { SharedModule } from 'app/shared/modules/shared.module';
import { FarmerComponent } from './farmer.component';
import { AgriculturalExperiencesModule } from './agricultural-experiences/agricultural-experiences.module';


@NgModule({
  declarations: [
    FarmerComponent
  ],
  imports: [
    SharedModule,PrimeNgModule,InterestsWorkplaceModule,AgriculturalInterestsModule,AgriculturalExperiencesModule,
    FarmerRoutingModule,DynamicSelectModule
  ]
})
export class FarmerModule { }
