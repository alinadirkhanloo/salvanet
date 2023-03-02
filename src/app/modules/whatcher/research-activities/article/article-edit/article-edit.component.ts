import { ArticleService } from './../article.service';

import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component } from '@angular/core';
import { IThesis } from 'app/core/interfaces/thesis.interface';
import { SharedService } from 'app/shared/services/shared.service';


@Component({
  selector: 'app-article-edit',
  templateUrl: './article-edit.component.html',
  styleUrls: ['./article-edit.component.css']
})
export class ArticleEditComponent {

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;

  records=[]

  constructor(
    private _formBuilder: FormBuilder,
    private articleService: ArticleService,
    private route: ActivatedRoute,
    private router:Router,private shService :SharedService
  ) {
    // ITthesis
    this.editForm = this._formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(36)]],
      type: ['', [Validators.required, Validators.maxLength(36)]],
      printYear: ['', [Validators.required, Validators.maxLength(36)]],
      isForeign: ['', [ Validators.maxLength(36)]],
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
    let res = this.articleService.readById(id).subscribe({
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
      let rest = this.updateMode?this.articleService.update(this.editForm.value.id,this.editForm.value):this.articleService.create(this.editForm.value);
      let restSub =rest.subscribe({
        next: (result) => {
          this.disableButton = false;
          this.router.navigate(['pages/case-history/research-activities/article']);
          this.shService.showError()
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
    this.router.navigate(['pages/case-history/research-activities/article']);
  }


}

