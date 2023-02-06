import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from 'core/components/loading/loading.component';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    NgxSpinnerModule,FormsModule
  ],
  exports: [
    LoadingComponent,
  ]
})
export class LoadingModule { }
