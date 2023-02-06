import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SwitcherComponent } from 'core/components/switcher/switcher.component';
import { NgbNavModule } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';



@NgModule({
  declarations: [
    SwitcherComponent,
  ],
  imports: [
    CommonModule,
    NgbNavModule,
    PerfectScrollbarModule
  ],
  exports: [
    SwitcherComponent,
  ]
})
export class SwitcherModule { }
