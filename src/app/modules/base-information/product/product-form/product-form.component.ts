import { Subscription } from 'rxjs';
import { IProduct } from './../product.interface';
import { ProductService } from './../product.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit, OnDestroy{

  editForm:FormGroup;
  disableButton = false;
  private sub = new Subscription();

  @Input()
  updateMode = false;

  @Input() 
  product!:IProduct;

  constructor(
    private activeModal:NgbActiveModal,
    private _fb:FormBuilder,
    private productService:ProductService,
    private shService:SharedService
    ){
      this.editForm = this._fb.group({
        id:-1,
        code:['',[Validators.required,Validators.maxLength(4),Validators.minLength(2)]],
        name:['',[Validators.required,Validators.maxLength(64),Validators.minLength(2)]],
        description:['',[Validators.required,Validators.maxLength(512)]],
        hasVariety:true
        
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
            this.disableButton=false;
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
            this.disableButton=false;
          }
        })
        );
    }
  }

  close(){this.activeModal.dismiss()}
}
