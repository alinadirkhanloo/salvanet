import { AccountGuard } from './core/guards/access.guard';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { Error404Component } from 'core/components/pages/error404/error404.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./modules/auth/auth.module')
      .then(m => m.AccountModule),
  },
  {
    path: 'pages',
    loadChildren: () => import('./modules/page-container/page-container.module')
      .then(m => m.PageContainerModule), canActivate: [AccountGuard]
  },
  {
    path: 'not-found',
    component: Error404Component
  },
  {
    path: '**',
    redirectTo: 'not-found'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
