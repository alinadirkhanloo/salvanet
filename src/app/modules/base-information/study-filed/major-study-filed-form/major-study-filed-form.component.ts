import { TreeNode } from 'primeng/api';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from 'app/shared/services/shared.service';
import { IMajorStudyField, IStudyFiled } from '../study-filed.interface';
import { MajorStudyFieldService } from './major-study-filed.service';

@Component({
  selector: 'app-major-study-filed-form',
  templateUrl: './major-study-filed-form.component.html',
  styleUrls: ['./major-study-filed-form.component.css']
})
export class MajorStudyFiledFormComponent implements OnInit, OnDestroy{

  editForm:FormGroup;
  disableButton = false;
  private sub = new Subscription();

  @Input()
  updateMode = false;

  @Input() 
  model!:IMajorStudyField;
  node!:TreeNode;


  constructor(
    private activeModal:NgbActiveModal,
    private _fb:FormBuilder,
    private msfService:MajorStudyFieldService,
    private shService:SharedService
    ){
      this.editForm = this._fb.group({
        id:-1,
        title:['',[Validators.required,Validators.maxLength(64),Validators.minLength(2)]],
        studyFieldId:-1,
        studyFiledTitle:['',[Validators.required]],
        description:['',[Validators.required,Validators.maxLength(512),Validators.minLength(2)]]
        
      })
  }
  ngOnDestroy(): void {
   this.sub.unsubscribe();
  }
  ngOnInit(): void {
    if (this.updateMode) {
      this.loadById(this.node.data);
      this.editForm.controls['studyFiledTitle'].setValue(this.node?.parent.label);
        this.editForm.controls['studyFieldId'].setValue(this.node?.parent.data); 
    }else {
      if (this.node) {
        this.editForm.controls['studyFiledTitle'].setValue(this.node?.label);
        this.editForm.controls['studyFieldId'].setValue(this.node?.data);  
      }
    }    
  }

  loadById(id:number|string) {

    let res = this.msfService.readById(id).subscribe({
      next:(result)=>{
       this.editForm.controls['title'].setValue(result.title);
       this.editForm.controls['description'].setValue(result.description);
      },
      error:(err)=> {
        this.shService.showError('خطار در دریافت اطلاعات');
        this.disableButton = false;
      }
    });

  }

  submit(){
    this.disableButton = true;
    if (this.updateMode) {
      this.sub.add(
        this.msfService.update(this.editForm.value as IMajorStudyField).subscribe({
          next:(res)=>{
            this.shService.showSuccess();
            this.activeModal.close(true);
          },
          error:(err)=>{
            this.shService.showError();
            this.disableButton=false;
          }
        })
        );
    } else {
      let temp :IMajorStudyField ={
        description:this.editForm.value.description,
        id:this.editForm.value.id,
        studyFieldId:this.editForm.value.studyFieldId,
        title:this.editForm.value.title
      }
      
      
      this.sub.add(
        this.msfService.create(temp).subscribe({
          next:(res)=>{
            this.shService.showSuccess();
            this.activeModal.close(true);
          },
          error:(err)=>{
            this.shService.showError();
            this.disableButton=false;
          }
        })
        );
    }
  }

  close(){this.activeModal.dismiss()}
}
