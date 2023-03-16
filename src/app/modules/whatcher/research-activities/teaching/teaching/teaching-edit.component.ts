import { ActivatedRoute, Router } from '@angular/router';
import { ITeaching } from 'app/core/interfaces/teaching.interface';
import { TeachingService } from './../teaching.service';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'app-teaching-edit',
  templateUrl: './teaching-edit.component.html',
  styleUrls: ['./teaching-edit.component.css']
})
export class TeachingEditComponent implements OnInit {

  records=[];

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;
  colapsed=true;
  constructor(
    private _formBuilder: FormBuilder,
    private teachingService: TeachingService,
    private route: ActivatedRoute,
    private router:Router,private shService:SharedService
  ) {
    // ITeaching 
    this.editForm = this._formBuilder.group({
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
    let res = this.teachingService.readById(id).subscribe({
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
    this.editForm.setValue(entityData as ITeaching[]);
  }

  submit() {

    this.disableButton = true;

    if (this.editForm.valid) {
      let rest = this.updateMode?this.teachingService.update(this.editForm.value.id,this.editForm.value):this.teachingService.create(this.editForm.value) ;
      let restSub =rest.subscribe({
        next: (result) => {
          this.shService.showSuccess()
          this.disableButton = false;
          this.router.navigate(['pages/case-history/research-activities/teaching']);
        },
        error: (error) => {
          this.shService.showSuccess()
            this.disableButton = false;
        },
        complete() {
          restSub.unsubscribe();
        }
      });
    }
  }

  cancle(){
    this.router.navigate(['pages/case-history/research-activities/teaching']);
  }


}
