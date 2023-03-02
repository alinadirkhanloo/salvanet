import { IJob } from 'app/core/interfaces/job.interface';
import { AuthService } from 'core/services/auth/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from 'app/shared/services/shared.service';
import { WatcherService } from '../watcher.service';
import { GenericClass } from 'app/core/models/genericClass.model';

@Component({
  selector: 'app-job-edit',
  templateUrl: './job-edit.component.html',
  styleUrls: ['./job-edit.component.css']
})
export class JobEditComponent extends GenericClass implements OnInit, OnDestroy{

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;
  records=[];

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private watcher: WatcherService,private shService:SharedService
  ) {
    super();
    this.editForm = this._formBuilder.group({
      workPlace: ['', [Validators.required, Validators.maxLength(36)]],
      position: ['', [Validators.required, Validators.maxLength(36)]],
      startDate: ['', [Validators.required, Validators.maxLength(24)]],
      endDate: ['', [Validators.required, Validators.maxLength(24)]],
      id:-1
    });
  }


  ngOnInit(): void {
  }

  ngOnDestroy() : void{

  }
  
  setDataToForm(entityData:any) {
    this.editForm.setValue(entityData as IJob[]);
  }

  submit() {

    this.disableButton = true;
    let temp = this.editForm.value;
    if (this.editForm.valid) {
      this.subscription = this.watcher.create(temp).subscribe({
        next: (result) => {
          this.shService.showSuccess();
          this.disableButton = false;
          this.records.push(result);
          this.router.navigate(['pages/case-history/job-records']);
        },
        error: (error) => {
            this.disableButton = false;
            this.shService.showError()
        }
      });
    }
  }

}
