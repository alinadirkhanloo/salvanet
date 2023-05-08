import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageContainerComponent } from 'app/modules/page-container/page-container.component';
import { PageContainerRoutingModule } from 'app/core/router/page-container-routing.module';
import { FooterModule } from 'core/components/footer/footer.module';
import { HeaderModule } from 'core/components/header/header.module';
import { LoadingModule } from 'core/components/loading/loading.module';
import { NavHeaderModule } from 'core/components/nav-header/nav-header.module';
import { NavigationModule } from 'core/components/navigation/navigation.module';
import { Error404Module } from 'core/components/pages/error404/error404.module';
import { SwitcherModule } from 'core/components/switcher/switcher.module';
import { NgbModule, NgbNavItem } from '@ng-bootstrap/ng-bootstrap';
import { RoleSelectorModule } from 'app/core/components/role-selector/role-selector.module';
import { RolesService } from 'app/shared/services/role.service';



@NgModule({
  declarations: [
    PageContainerComponent,
  ],
  imports: [
    CommonModule,
    PageContainerRoutingModule,
    FooterModule,
    HeaderModule,
    LoadingModule,
    NavHeaderModule,
    NavigationModule,
    Error404Module,
    SwitcherModule,
    RoleSelectorModule,NgbModule
  ],
  providers:[NgbNavItem]
})
export class PageContainerModule { }
