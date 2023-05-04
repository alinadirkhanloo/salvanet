import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path:'',
    loadChildren: () => import('./lands/lands.module')
      .then(m => m.LandsModule),
  },
  {
    path:'product-unit',
    loadChildren: () => import('./product-unit/product-unit.module')
      .then(m => m.ProductUnitModule),
  },
  {
    path:'product-unit/:id/owners',
    loadChildren: () => import('./owners/owners.module')
      .then(m => m.OwnersModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LandOwnerRoutingModule { }
