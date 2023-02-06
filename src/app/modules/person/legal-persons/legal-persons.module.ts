import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LegalPersonsComponent } from './legal-persons.component';



@NgModule({
  declarations: [
    LegalPersonsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{path:'',component:LegalPersonsComponent}])
  ]
})
export class LegalPersonsModule { }
