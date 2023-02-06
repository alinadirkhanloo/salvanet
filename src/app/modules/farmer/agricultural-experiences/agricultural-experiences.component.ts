import { Subscription, Observable } from 'rxjs';
import { IDynamicSelect, IDynamicSelectItem } from 'core/components/dynamics/dynamic-select/dynamic-select.interface';
import { ConfirmationService } from 'primeng/api';
import { AgriculturalExperiencesService } from './agricultural-experiences.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-agricultural-experiences',
  templateUrl: './agricultural-experiences.component.html',
  styleUrls: ['./agricultural-experiences.component.css']
})
export class AgriculturalExperiencesComponent implements OnInit {
  private subscription = new Subscription();
  disableButton = true;

  productConfig !: IDynamicSelect;
  digitConfig !: IDynamicSelect;
  stateConfig !: IDynamicSelect;
  townShip !: IDynamicSelect;
  city !: IDynamicSelect;
  village !: IDynamicSelect;
  villageShip !: IDynamicSelect;

  address = '';
  stateModel : IDynamicSelectItem;
  townShipModel : IDynamicSelectItem ;
  cityModel : IDynamicSelectItem;
  villageModel : IDynamicSelectItem;
  villageShipModel : IDynamicSelectItem;

  intrest = '';
  productModel : IDynamicSelectItem;
  digitModel : IDynamicSelectItem ;

  products = []

  constructor(private aeService:AgriculturalExperiencesService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.initialSelections();
    this.loadData();
  }

  loadData(){
    this.subscription.add(this.aeService.agriculturalExperience$.subscribe({
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
      options$: this.aeService.readList('products'),
      selectId: 'product',
      placeholder: '...',
      filter: true,
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }
    this.digitConfig = {
      options$: new Observable<IDynamicSelectItem[]>(null),
      selectId: 'digit',
      placeholder: '...',
      filter: true,
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }

    
  }

  _onProductChange(event) {
    if (this.productModel) {
      this.getList( this.aeService.readById(this.productModel.id, 'digits'),this.digitConfig)
    }
  }
  _onDigitChange(event) {
    if (this.digitModel) {
      this.disableButton = false;
    }
  }

  
  _onStateChange(event) {
    if (this.stateModel) {
      this.getList( this.aeService.readById(this.stateModel.id, 'townships'),this.townShip)
    }
  }
  _onTownShipChange(event) {
    if (this.townShipModel) {
      this.getList( this.aeService.readById(this.townShipModel.id, 'cities'),this.city)
    }
  }
  _onCityChange(event) {
    if (this.cityModel) {
      this.getList( this.aeService.readById(this.cityModel.id, 'villages'),this.village);
    }
  }
  _onVillageChange(event) {
    if (this.villageModel) {
      this.getList( this.aeService.readById(this.villageModel.id, 'villageships'),this.villageShip)
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
    return `${this.getAddress()
    }
    ${this.productModel?this.productModel.topic:''} - ${this.digitModel?this.digitModel.topic:''}`
  }
  getAddress(): string {
    return `${this.stateModel?this.stateModel.topic:''} - ${this.townShipModel?this.townShipModel.topic:''} - ${this.cityModel?this.cityModel.topic:''} - ${this.villageModel?this.villageModel.topic:''} - ${this.villageShipModel?this.villageShipModel.topic:''}`
  }

  confirmDelete(event: Event, id: string) {
    this.confirmationService.confirm({
      target: event.target,
      message: `کاربر گرامی، آیا قصد حذف این فیلد را دارید؟`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'بله',
      rejectLabel:'خیر',
      acceptButtonStyleClass:'mx-2',
      accept: () => {
        //confirm action
      },
      reject: () => {
        //reject action
      }
    });
  }
}
