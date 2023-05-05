import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PrimeNgModule } from 'app/shared/modules/primeng/primeng.module';
import { SpinOnModule } from './../directives/spin-on-directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { OnlyNumberModule } from '../directives/only-number.directive';
import { HasRoleModule } from '../directives/required-roles.directive';
@NgModule({
    imports: [
      CommonModule,
      FormsModule, ReactiveFormsModule,NgbModule,
      SpinOnModule,PrimeNgModule,OnlyNumberModule,HasRoleModule
    ],
    exports: [
      CommonModule,NgbModule,
      FormsModule, ReactiveFormsModule,
      SpinOnModule,PrimeNgModule,OnlyNumberModule,HasRoleModule
    ]
  })
  export class SharedModule { }
