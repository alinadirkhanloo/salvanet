import { SharedModule } from 'app/shared/modules/shared.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NaturalPersonsComponent } from './natural-persons.component';



@NgModule({
  declarations: [
    NaturalPersonsComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild([{path:'',component:NaturalPersonsComponent}])
  ]
})
export class NaturalPersonsModule { }
