import { SharedService } from 'app/shared/services/shared.service';
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
  private sub = new Subscription();

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
    private confirmationService: ConfirmationService,
    private shService: SharedService) { }

  ngOnInit(): void {
    this.initialSelections();
    this.loadData();
  }

  loadData(){
    this.subscription.add(this.aeService.readList().subscribe({
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
    this.stateConfig = {
      options$: this.aeService.readList('states'),
      selectId: 'state',
      placeholder: '...',
      filter: true,
      showClear:true,
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }
    this.townShip = {
      options$: new Observable<IDynamicSelectItem[]>(null),
      selectId: 'townShip',
      placeholder: '...',
      filter: true,
      showClear:true,
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }
    this.city = {
      options$: new Observable<IDynamicSelectItem[]>(null),
      selectId: 'city',
      placeholder: '...',
      filter: true,
      showClear:true,
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }
    this.village = {
      options$:new Observable<IDynamicSelectItem[]>(null),
      selectId: 'village',
      placeholder: '...',
      filter: true,
      showClear:true,
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }
    this.villageShip = {
      options$: new Observable<IDynamicSelectItem[]>(null),
      selectId: 'villageShip',
      placeholder: '...',
      filter: true,
      showClear:true,
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
    return `${this.getIntrestStrign()}${this.getDigitStrign()}$`
  }
  getAddress(): string {
    return `${this.getStateStrign()}${this.getTownStrign()}${this.getCityStrign()}${this.getVillageStrign()}${this.getVillageShipStrign()}`
  }

  getIntrestStrign(): string {
    return this.productModel ? `${this.productModel.title} - ` : '';
  }
  getDigitStrign(): string {
    return this.digitModel ? `${this.digitModel.title} - ` : '';
  }
  getStateStrign(): string {
    return this.stateModel ? `${this.stateModel.title} - ` : '';
  }
  getTownStrign(): string {
    return this.townShipModel ? `${this.townShipModel.title} - ` : '';
    // return `${this.townShipModel?this.townShipModel.title:''} - `;
  }
  getCityStrign(): string {
    return this.cityModel ? `${this.cityModel.title} - ` : '';
    // return `${this.cityModel?this.cityModel.title:''} - `;
  }
  getVillageStrign(): string {
    return this.villageModel ? `${this.villageModel.title} - ` : '';
    // return `${this.villageModel?this.villageModel.title:''} - `;
  }
  getVillageShipStrign(): string {
    return this.villageShipModel ? `${this.villageShipModel.title}` : '';
    // return `${this.villageShipModel?this.villageShipModel.title:''} - `;
  }
  confirmDelete(event: Event, id: string) {
    this.confirmationService.confirm({
      target: event.target,
      message: `کاربر گرامی، آیا قصد حذف  تجربه کار را دارید؟`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'بله',
      rejectLabel: 'خیر',
      acceptButtonStyleClass: 'mx-2',
      accept: () => {
        //confirm action
        this.sub.add(
          this.aeService.delete(id).subscribe({
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


  clear(){

  }

  submit(){

  }
}
