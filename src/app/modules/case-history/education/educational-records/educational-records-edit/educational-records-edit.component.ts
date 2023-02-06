import { ActivatedRoute } from '@angular/router';
import { EducationalRecordsService } from './../educational-records.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { IEducationDegree } from 'app/core/interfaces/education-degree.interface';

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

  constructor(
    private _formBuilder: FormBuilder,
    private educationalRecordsService: EducationalRecordsService,
    private route: ActivatedRoute
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
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.updateMode = true;
        this.loadById(params['id']);
      }
    });
  }


  loadById(id:number|string) {
    let res = this.educationalRecordsService.getById(id).subscribe({
      next:(result)=>{
        this.setDataToForm(result);
      },
      error(err) {
        
      },
      complete() {
        res.unsubscribe();
      },
    });
  }

  setDataToForm(entityData:any) {
    this.editForm.setValue(entityData as IEducationDegree[]);
  }

  submit() {

    this.disableButton = true;

    if (this.editForm.valid) {
      let rest = this.updateMode?this.educationalRecordsService.insert(this.editForm.value) : this.educationalRecordsService.update(this.editForm.value.id,this.editForm.value);
      let restSub =rest.subscribe({
        next: (result) => {
          this.disableButton = false;
        },
        error: (error) => {
            this.disableButton = false;
        },
        complete() {
          restSub.unsubscribe();
        }
      });
    }
  }

  cancle(){}


}
