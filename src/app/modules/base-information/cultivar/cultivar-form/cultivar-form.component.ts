import { IDynamicSelect } from './../../../../core/components/dynamics/dynamic-select/dynamic-select.interface';
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
  myProductConfig !: IDynamicSelect;

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
        id:null,
        code:['',[Validators.required,Validators.maxLength(4),Validators.minLength(2)]],
        name:['',[Validators.required,Validators.maxLength(32),Validators.minLength(3)]],
        description:['',[Validators.required,Validators.maxLength(512)]],
        productId:[null,[Validators.required]]

      })
  }

  ngOnInit(): void {
    this.initialSelections();
    if (this.updateMode) {
      this.editForm.setValue(this.product);
    }
  }



  initialSelections() {
    this.myProductConfig = {
      options$: this.cultivarService.readList('', 'product'),
      selectId: 'product1',
      placeholder: '...',
      optionValue: 'id',
      optionLabel: 'name',
      filter: true,
      showClear: true,
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }
  }


  ngOnDestroy(): void {
   this.sub.unsubscribe();
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

