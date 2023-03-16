import { ICultivar } from './../cultivar';
import { SharedService } from 'app/shared/services/shared.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { CultivarService } from '../cultivar.service';

@Component({
  selector: 'app-cultivar-form',
  templateUrl: './cultivar-form.component.html',
  styleUrls: ['./cultivar-form.component.css']
})
export class CultivarFormComponent implements OnInit, OnDestroy{

  editForm:FormGroup;
  disableButton = false;
  private sub = new Subscription();

  @Input()
  updateMode = false;

  @Input() 
  product!:ICultivar;

  constructor(
    private activeModal:NgbActiveModal,
    private _fb:FormBuilder,
    private cultivarService:CultivarService,
    private shService:SharedService
    ){
      this.editForm = this._fb.group({
        id:-1,
        code:['',[Validators.required,Validators.maxLength(4),Validators.minLength(2)]],
        name:['',[Validators.required,Validators.maxLength(64),Validators.minLength(2)]],
        description:['',[Validators.required,Validators.maxLength(512)]],
        parentId:-1
        
      })
  }
  ngOnDestroy(): void {
   this.sub.unsubscribe();
  }
  ngOnInit(): void {
    if (this.updateMode) {
      this.editForm.setValue(this.product);
    }
  }

  submit(){
    this.disableButton = true;
    if (this.updateMode) {
      this.sub.add(
        this.cultivarService.update(this.editForm.value).subscribe({
          next:(res)=>{
            this.shService.showSuccess();
            this.activeModal.close(true);
          },
          error:(err)=>{
            this.shService.showError();
            this.disableButton = false;
          }
        })
        );
    } else {
      this.sub.add(
        this.cultivarService.create(this.editForm.value).subscribe({
          next:(res)=>{
            this.shService.showSuccess();
            this.activeModal.close(true);
          },
          error:(err)=>{
            this.shService.showError();
            this.disableButton = false;
          }
        })
        );
    }
  }

  close(){this.activeModal.dismiss()}
}

