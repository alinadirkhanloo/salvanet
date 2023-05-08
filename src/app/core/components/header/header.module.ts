import { RoleSelectorModule } from './../role-selector/role-selector.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { HeaderComponent } from 'core/components/header/header.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SharedModule } from 'app/shared/modules/shared.module';
import {PrimeNgModule} from 'shared/modules/primeng/primeng.module';



@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    SharedModule,NgbModule,RouterModule,PrimeNgModule,RoleSelectorModule
  ],
  exports: [
    HeaderComponent,
  ]
})
export class HeaderModule { }
