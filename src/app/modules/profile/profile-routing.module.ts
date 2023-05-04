import { ProfileComponent } from './profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [{path:'',component:ProfileComponent
,children:[
  {
    path: 'cources',
    loadChildren: () => import('modules/cources/cources.module')
      .then(m => m.CourcesModule)
  }
]}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProfileRoutingModule { }
