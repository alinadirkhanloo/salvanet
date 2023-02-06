import { SimCardEditComponent } from './sim-card-edit/sim-card-edit.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';


import { SimCardComponent } from './sim-card.component';
import { SharedModule } from 'app/shared/modules/shared.module';


const routes: Routes = [
  {
    path: '', component:SimCardComponent,
  },
  {
    path: 'edit/:ownerId',component:SimCardEditComponent
  },
  {
    path:'new',component:SimCardEditComponent
  }
];


@NgModule({
  declarations: [
    SimCardComponent,SimCardEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class SimCardModule { }
