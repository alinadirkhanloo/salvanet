import { SharedService } from 'app/shared/services/shared.service';
import { AgriculturalInterestsService } from './agricultural-interests.service';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { IDynamicSelectItem } from 'core/components/dynamics/dynamic-select/dynamic-select.interface';
import { IDynamicSelect } from 'core/components/dynamics/dynamic-select/dynamic-select.interface';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agricultural-interests',
  templateUrl: './agricultural-interests.component.html',
  styleUrls: ['./agricultural-interests.component.css']
})
export class AgriculturalInterestsComponent implements OnInit {
  private subscription = new Subscription();
  disableButton = true;
  private sub = new Subscription();

  productConfig !: IDynamicSelect;
  digitConfig !: IDynamicSelect;

  intrest = '';
  productModel : IDynamicSelectItem;
  digitModel : IDynamicSelectItem ;

  products = []

  constructor(private aiService:AgriculturalInterestsService ,
    private confirmationService: ConfirmationService,
    private shService: SharedService) { }

  ngOnInit(): void {
    this.initialSelections();
    this.loadData();
  }

  loadData(){
    this.subscription.add(this.aiService.readList().subscribe({
      next:(result)=>{
        this.products = result;
      },
      error:(err)=>{

      }
    })
    )
  }

  initialSelections() {
    this.productConfig = {
      options$: this.aiService.readList('products'),
      selectId: 'product',
      placeholder: '...',
      filter: true,
      showClear:true,
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }
    this.digitConfig = {
      options$: new Observable<IDynamicSelectItem[]>(null),
      selectId: 'digit',
      placeholder: '...',
      filter: true,
      showClear:true,
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }

  }

  _onProductChange(event) {
    if (this.productModel) {
      this.getList( this.aiService.readById(this.productModel.id, 'digits'),this.digitConfig)
    }
  }
  _onDigitChange(event) {
    if (this.digitModel) {
      this.disableButton = false;
    }
  }


  getList(res:Observable<any>,selectConfig:IDynamicSelect){
    this.subscription.add(
      res.subscribe(result=>{
        selectConfig.items=result;
      })
    )

  }
  getIntrests(): string {
    return `${this.productModel?this.productModel.title:''} - ${this.digitModel?this.digitModel.title:''}`
  }

  confirmDelete(event: Event, id: string | number) {
    this.confirmationService.confirm({
      target: event.target,
      message: `کاربر گرامی، آیا قصد حذف محل کار را دارید؟`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'بله',
      rejectLabel: 'خیر',
      acceptButtonStyleClass: 'mx-2',
      accept: () => {
        //confirm action
        this.sub.add(
          this.aiService.delete(id).subscribe({
            next: (res) => {
              this.shService.showSuccess();
            },
            error: (err) => {
              this.shService.showError();
            }
          })
        )
      },
      reject: () => {
        //reject action
      }
    });
  }
}
