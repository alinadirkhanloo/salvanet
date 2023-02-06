import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgriculturalLandComponent } from './agricultural-land.component';
import { AgriculturalLandEditComponent } from './agricultural-land-edit/agricultural-land-edit.component';



@NgModule({
  declarations: [
    AgriculturalLandComponent,
    AgriculturalLandEditComponent
  ],
  imports: [
    CommonModule
  ]
})
export class AgriculturalLandModule { }
