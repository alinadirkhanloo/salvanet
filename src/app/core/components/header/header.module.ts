import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from 'core/components/header/header.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';



@NgModule({
  declarations: [
    HeaderComponent,
  ],
  imports: [
    CommonModule,FormsModule,NgbModule,ReactiveFormsModule
  ],
  exports: [
    HeaderComponent,
  ]
})
export class HeaderModule { }
