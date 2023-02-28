import { IJob } from 'app/core/interfaces/job.interface';
import { AuthService } from 'core/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { JobService } from '../job.service';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent implements OnInit{

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private jService: JobService,private shService:SharedService
  ) {
    this.editForm = this._formBuilder.group({
      workPlace: ['', [Validators.required, Validators.maxLength(36)]],
      position: ['', [Validators.required, Validators.maxLength(36)]],
      startDate: ['', [Validators.required, Validators.maxLength(24)]],
      endDate: ['', [Validators.required, Validators.maxLength(24)]],
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
    let res = this.jService.readById(id).subscribe({
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
    this.editForm.setValue(entityData as IJob[]);
  }

  submit() {

    this.disableButton = true;
    let temp = this.editForm.value;
    if (this.editForm.valid) {
      let rest = this.updateMode?this.jService.update(this.editForm.value.id,temp):this.jService.create(temp);
      let restSub =rest.subscribe({
        next: (result) => {
          this.shService.showSuccess();
          this.disableButton = false;
          this.router.navigate(['pages/case-history/job-records']);
        },
        error: (error) => {
            this.disableButton = false;
            this.shService.showError()
        },
        complete() {
          restSub.unsubscribe();
        }
      });
    }
  }

  cancle(){
    this.router.navigate(['pages/case-history/job-records']);
  }


}
