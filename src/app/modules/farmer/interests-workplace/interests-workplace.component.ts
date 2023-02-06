import { ConfirmationService } from 'primeng/api';
import { Observable, Subscription } from 'rxjs';
import { IDynamicSelectItem } from 'core/components/dynamics/dynamic-select/dynamic-select.interface';
import { IDynamicSelect } from 'core/components/dynamics/dynamic-select/dynamic-select.interface';
import { Component, OnInit } from '@angular/core';
import { InterestsWorkplaceService } from './interests-workplace.service';

@Component({
  selector: 'app-interests-workplace',
  templateUrl: './interests-workplace.component.html',
  styleUrls: ['./interests-workplace.component.css']
})
export class InterestsWorkplaceComponent implements OnInit {
  private subscription = new Subscription();
  disableButton = true;
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

 
  products = []

  constructor(private iwService: InterestsWorkplaceService,
    private confirmationService: ConfirmationService) { }

  ngOnInit(): void {
    this.initialSelections();
    this.loadData();
  }

  loadData(){
    this.subscription.add(this.iwService.interestsWorkplaces$.subscribe({
      next:(result)=>{
        this.products = result;
      },
      error:(err)=>{
        
      }
    })
    )
  }

  initialSelections() {
    this.stateConfig = {
      options$: this.iwService.readList('states'),
      selectId: 'state',
      placeholder: '...',
      filter: true,
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }
    this.townShip = {
      options$: new Observable<IDynamicSelectItem[]>(null),
      selectId: 'townShip',
      placeholder: '...',
      filter: true,
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }
    this.city = {
      options$: new Observable<IDynamicSelectItem[]>(null),
      selectId: 'city',
      placeholder: '...',
      filter: true,
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }
    this.village = {
      options$:new Observable<IDynamicSelectItem[]>(null),
      selectId: 'village',
      placeholder: '...',
      filter: true,
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }
    this.villageShip = {
      options$: new Observable<IDynamicSelectItem[]>(null),
      selectId: 'villageShip',
      placeholder: '...',
      filter: true,
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }
  }

  _onStateChange(event) {
    if (this.stateModel) {
      this.getList( this.iwService.readById(this.stateModel.id, 'townships'),this.townShip)
    }
  }
  _onTownShipChange(event) {
    if (this.townShipModel) {
      this.getList( this.iwService.readById(this.townShipModel.id, 'cities'),this.city)
    }
  }
  _onCityChange(event) {
    if (this.cityModel) {
      this.getList( this.iwService.readById(this.cityModel.id, 'villages'),this.village);
      this.disableButton = false;
    }
  }
  _onVillageChange(event) {
    if (this.villageModel) {
      this.getList( this.iwService.readById(this.villageModel.id, 'villageships'),this.villageShip)
    }
  }

  getList(res:Observable<any>,selectConfig:IDynamicSelect){
    this.subscription.add(
      res.subscribe(result=>{
        selectConfig.items=result;
      })
    )

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
