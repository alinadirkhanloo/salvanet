import { PrimeNgModule } from 'app/shared/modules/primeng/primeng.module';
import { SpinOnModule } from './../directives/spin-on-directive';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ToastrModule } from 'ngx-toastr';
@NgModule({
    imports: [
      CommonModule,
      FormsModule, ReactiveFormsModule,
      SpinOnModule,PrimeNgModule,ToastrModule.forRoot()
    ],
    exports: [
      CommonModule,
      FormsModule, ReactiveFormsModule,
      SpinOnModule,PrimeNgModule
    ]
  })
  export class SharedModule { }
  