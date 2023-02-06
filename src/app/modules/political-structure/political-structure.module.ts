import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PoliticalStructureComponent } from './political-structure.component';
import { SharedModule } from 'app/shared/modules/shared.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    PoliticalStructureComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{path:'',component:PoliticalStructureComponent}])
  ]
})
export class PoliticalStructureModule { }
