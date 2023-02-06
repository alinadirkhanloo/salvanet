import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'app/shared/modules/shared.module';
import { NgModule } from '@angular/core';
import { ServerComponent } from './server.component';
import { ServerEditComponent } from './server-edit/server-edit.component';

const routes: Routes = [
  {
    path: '', component:ServerComponent,
  },
  {
    path: 'edit/:id',component:ServerEditComponent
  },
  {
    path:'new',component:ServerEditComponent
  }
];


@NgModule({
  declarations: [
    ServerComponent,
    ServerEditComponent
  ],
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ]
})
export class ServerModule { }
