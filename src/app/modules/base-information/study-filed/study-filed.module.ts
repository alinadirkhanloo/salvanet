import { RouterModule } from '@angular/router';
import { SharedModule } from 'app/shared/modules/shared.module';
import { PrimeNgModule } from 'shared/modules/primeng/primeng.module';
import { DynamicSelectModule } from 'core/components/dynamics/dynamic-select/dynamic-select.module';
import { DynamicTreeModule } from 'app/core/components/dynamics/dynamic-tree/dynamic-tree.module';
import { NgModule } from '@angular/core';

import { StudyFiledComponent } from './study-filed.component';
import { StudyFiledFormComponent } from './study-filed-form/study-filed-form.component';
import { MajorStudyFiledFormComponent } from './major-study-filed-form/major-study-filed-form.component';



@NgModule({
  declarations: [
    StudyFiledComponent,
    StudyFiledFormComponent,
    MajorStudyFiledFormComponent
  ],
  imports: [
    SharedModule,DynamicTreeModule,DynamicSelectModule,PrimeNgModule,
    RouterModule.forChild([{path:'',component:StudyFiledComponent}])
  ]
})
export class StudyFiledModule { }
