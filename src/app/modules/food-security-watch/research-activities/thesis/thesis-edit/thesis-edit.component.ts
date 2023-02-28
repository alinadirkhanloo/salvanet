import { IThesis } from 'app/core/interfaces/thesis.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ThesisService } from '../thesis.service';
import { SharedService } from 'app/shared/services/shared.service';


@Component({
  selector: 'app-thesis-edit',
  templateUrl: './thesis-edit.component.html',
  styleUrls: ['./thesis-edit.component.css']
})

export class ThesisEditComponent implements OnInit{

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;

  constructor(
    private _formBuilder: FormBuilder,
    private thesisService: ThesisService,
    private route: ActivatedRoute,
    private router:Router,private shService:SharedService
  ) {
    // ITthesis
    this.editForm = this._formBuilder.group({
      score: ['', [Validators.required, Validators.maxLength(5)]],
      title: ['', [Validators.required, Validators.maxLength(36)]],
      id:-1
    });
  }

  ngOnInit(): void { 
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.updateMode = true;
        this.loadThesis(params['id']);
      }
    });
  }


  loadThesis(id:number|string) {
    let res = this.thesisService.readById(id).subscribe({
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
    this.editForm.setValue(entityData as IThesis[]);
  }

  submit() {

    this.disableButton = true;

    if (this.editForm.valid) {
      let rest = this.updateMode?this.thesisService.update(this.editForm.value.id,this.editForm.value):this.thesisService.create(this.editForm.value) ;
      let restSub =rest.subscribe({
        next: (result) => {
          this.shService.showSuccess()
          this.disableButton = false;
          this.router.navigate(['pages/case-history/research-activities/thesis']);
        },
        error: (error) => {

          this.shService.showError()
            this.disableButton = false;
        },
        complete() {
          restSub.unsubscribe();
        }
      });
    }
  }

  cancle(){
    this.router.navigate(['pages/case-history/research-activities/thesis']);
  }


}
