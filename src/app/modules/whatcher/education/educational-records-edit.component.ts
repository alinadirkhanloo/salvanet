import { IDynamicSelect } from 'core/components/dynamics/dynamic-select/dynamic-select.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IEducationDegree } from 'app/core/interfaces/education-degree.interface';
import { SharedService } from 'app/shared/services/shared.service';
import { WatcherService } from '../watcher.service';

@Component({
  selector: 'app-educational-records-edit',
  templateUrl: './educational-records-edit.component.html',
  styleUrls: ['./educational-records-edit.component.css']
})
export class EducationalRecordsEditComponent implements OnInit {

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;
  records =[];
  educationLevelConfig!: IDynamicSelect;

  constructor(
    private _formBuilder: FormBuilder,
    private watcherService: WatcherService,
    private router:Router,private shService:SharedService
  ) {

    this.editForm = this._formBuilder.group({
      educationLevelId: ['', [Validators.required, Validators.maxLength(36)]],
      university: ['', [Validators.required, Validators.maxLength(36)]],
      studiFild : ['', [Validators.required, Validators.maxLength(36)]],
      gpa: ['', [Validators.required, Validators.maxLength(36)]],
      id:-1
    });
  }

  ngOnInit(): void { 
    this.educationLevelConfig = {
      options$: this.watcherService.educationLevels$,
      selectId: 'product',
      placeholder: '...',
      showClear:true,
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }
  }


  setDataToForm(entityData:any) {
    this.editForm.setValue(entityData as IEducationDegree[]);
  }

  submit() {

    this.disableButton = true;
    let temp = this.editForm.value;
    temp.educationLevelId = this.editForm.controls["educationLevelId"].value.id;
    if (this.editForm.valid) {
      let rest = this.watcherService.create(temp);
      let restSub =rest.subscribe({
        next: (result) => {
          this.shService.showSuccess();
          this.records.push(result);
          this.disableButton = false;
        },
        error: (error) => {
          this.shService.showError();
            this.disableButton = false;
        },
        complete() {
          restSub.unsubscribe();
        }
      });
    }
  }

  cancle(){
    this.router.navigate(['pages/case-history/education-records']);
  }


}
