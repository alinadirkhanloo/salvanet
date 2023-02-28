import { TreeNode } from 'primeng/api';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from 'app/shared/services/shared.service';
import { IStudyFiled } from '../study-filed.interface';
import { StudyFiledService } from '../study-filed.service';


@Component({
  selector: 'app-study-filed-form',
  templateUrl: './study-filed-form.component.html',
  styleUrls: ['./study-filed-form.component.css']
})
export class StudyFiledFormComponent implements OnInit, OnDestroy{

  editForm:FormGroup;
  disableButton = false;
  private sub = new Subscription();

  @Input()
  updateMode = false;

  @Input()
  node!:TreeNode;

  constructor(
    private activeModal:NgbActiveModal,
    private _fb:FormBuilder,
    private sfService:StudyFiledService,
    private shService:SharedService
    ){
      this.editForm = this._fb.group({
        id:-1,
        title:['',[Validators.required,Validators.maxLength(64),Validators.minLength(2)]],
        description:['',[Validators.required,Validators.maxLength(512),Validators.minLength(2)]]

      })
  }
  ngOnDestroy(): void {
   this.sub.unsubscribe();
  }
  ngOnInit(): void {
    if (this.updateMode) {
      this.loadById(this.node.data);
    }
  }

  loadById(id:number|string) {

    let res = this.sfService.readById(id).subscribe({
      next:(result)=>{
       this.editForm.controls['title'].setValue(result.title);
       this.editForm.controls['description'].setValue(result.description);
      },
      error:(err)=> {
        this.shService.showError('خطار در دریافت اطلاعات');
      },
      complete() {
        res.unsubscribe();
      },
    });

  }


  submit(){
    this.disableButton = true;
    if (this.updateMode) {
      this.sub.add(
        this.sfService.update(this.editForm.value).subscribe({
          next:(res)=>{
            this.shService.showSuccess();
            this.activeModal.close(true);
          },
          error:(err)=>{
            this.disableButton = false;
            this.shService.showError();
          }
        })
        );
    } else {
      this.sub.add(
        this.sfService.create(this.editForm.value).subscribe({
          next:(res)=>{
            this.shService.showSuccess();
            this.activeModal.close(true);
          },
          error:(err)=>{
            this.disableButton = false;
            this.shService.showError();
          }
        })
        );
    }
  }

  close(){this.activeModal.dismiss()}
}
