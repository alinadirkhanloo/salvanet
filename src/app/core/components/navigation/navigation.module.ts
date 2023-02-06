import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MetismenuAngularModule } from '@metismenu/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavigationComponent } from 'core/components/navigation/navigation.component';
import { RouterModule } from '@angular/router';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { NgxDropzoneModule } from 'ngx-dropzone';



@NgModule({
  declarations: [
    NavigationComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,FormsModule,ReactiveFormsModule,
    MetismenuAngularModule,
    PerfectScrollbarModule,
    NgxDropzoneModule,MetismenuAngularModule
  ],
  exports: [
    NavigationComponent
  ]
})
export class NavigationModule { }
