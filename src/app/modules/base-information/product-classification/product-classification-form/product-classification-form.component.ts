import { SharedService } from 'app/shared/services/shared.service';
import { ProductClassificationService } from './../product-classification.service';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IProductClassification } from './../product-classification.interface';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-product-classification-form',
  templateUrl: './product-classification-form.component.html',
  styleUrls: ['./product-classification-form.component.css']
})
export class ProductClassificationFormComponent implements OnInit, OnDestroy{

  editForm:FormGroup;
  disableButton = false;
  private sub = new Subscription();

  @Input()
  updateMode = false;

  @Input() 
  product!:IProductClassification;

  constructor(
    private activeModal:NgbActiveModal,
    private _fb:FormBuilder,
    private productService:ProductClassificationService,
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
        this.productService.update(this.editForm.value).subscribe({
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
        this.productService.create(this.editForm.value).subscribe({
          next:(res)=>{
            this.shService.showSuccess();
            this.activeModal.close(true);
          },
          error:(err)=>{
            this.shService.showError();
          }
        })
        );
    }
  }

  close(){this.activeModal.dismiss()}
}

