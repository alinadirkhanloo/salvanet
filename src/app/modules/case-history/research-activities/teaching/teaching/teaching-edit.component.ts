import { ActivatedRoute } from '@angular/router';
import { ITeaching } from 'app/core/interfaces/teaching.interface';
import { TeachingService } from './../teaching.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-teaching-edit',
  templateUrl: './teaching-edit.component.html',
  styleUrls: ['./teaching-edit.component.css']
})
export class TeachingEditComponent implements OnInit {

  teachingEditForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;

  constructor(
    private _formBuilder: FormBuilder,
    private teachingService: TeachingService,
    private route: ActivatedRoute
  ) {
    // ITeaching 
    this.teachingEditForm = this._formBuilder.group({
      subject: ['', [Validators.required, Validators.maxLength(36)]],
      venue: ['', [Validators.required, Validators.maxLength(36)]],
      year: ['', [Validators.required, Validators.maxLength(24)]],
      duration: ['', [Validators.required, Validators.maxLength(24)]],
      id:-1
    });
  }

  ngOnInit(): void { 
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.updateMode = true;
        this.loadTeaching(params['id']);
      }
    });
  }


  loadTeaching(id:number|string) {
    let res = this.teachingService.getById(id).subscribe({
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
    this.teachingEditForm.setValue(entityData as ITeaching[]);
  }

  submit() {

    this.disableButton = true;

    if (this.teachingEditForm.valid) {
      let rest = this.updateMode?this.teachingService.insert(this.teachingEditForm.value) : this.teachingService.update(this.teachingEditForm.value.id,this.teachingEditForm.value);
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
