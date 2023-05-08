import { OwnersEditComponent } from './owners-edit/owners-edit.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { OwnersComponent } from './owners.component';
import { SharedModule } from 'app/shared/modules/shared.module';
import { OwnerModalComponent } from '../owener-modal/owner-modal.component';
import { PersonModule } from 'app/core/components/user-find-box/person/person.module';

const routes: Routes = [
  {
    path: '', component:OwnersComponent,
  },
  {
    path: 'edit/:id',component:OwnersEditComponent
  },
  {
    path:'new',component:OwnersEditComponent
  }
];

@NgModule({
  declarations: [
    OwnersComponent,OwnersEditComponent,OwnerModalComponent
  ],
  imports: [
    PersonModule,
    SharedModule,RouterModule.forChild(routes)
  ]
})
export class OwnersModule { }
