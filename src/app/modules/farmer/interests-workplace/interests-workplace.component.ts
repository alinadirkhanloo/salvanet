import { SharedService } from 'app/shared/services/shared.service';
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
  private sub = new Subscription();
  address = '';
  stateModel: IDynamicSelectItem;
  townShipModel: IDynamicSelectItem;
  cityModel: IDynamicSelectItem;
  villageModel: IDynamicSelectItem;
  villageShipModel: IDynamicSelectItem;


  products = []

  constructor(private iwService: InterestsWorkplaceService,
    private confirmationService: ConfirmationService,
    private shService: SharedService
  ) { }

  ngOnInit(): void {
    this.initialSelections();
    this.loadData();
  }

  loadData() {
    this.subscription.add(this.iwService.readList().subscribe({
      next: (result) => {
        this.products = result;
      },
      error: (err) => {

      }
    })
    )
  }

  initialSelections() {
    this.stateConfig = {
      options$: this.iwService.readList('states'),
      selectId: 'state',
      placeholder: '...',
      optionLabel: 'title',
      showClear: true,
      filterBy: 'title'
    }
    this.townShip = {
      options$: new Observable<IDynamicSelectItem[]>(null),
      selectId: 'townShip',
      placeholder: '...',
      optionLabel: 'title',
      showClear: true,
      filterBy: 'title',
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }
    this.city = {
      options$: new Observable<IDynamicSelectItem[]>(null),
      selectId: 'city',
      placeholder: '...',
      optionLabel: 'title',
      showClear: true,
      filterBy: 'title',
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }
    this.village = {
      options$: new Observable<IDynamicSelectItem[]>(null),
      selectId: 'village',
      placeholder: '...',
      optionLabel: 'title',
      showClear: true,
      filterBy: 'title',
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }
    this.villageShip = {
      options$: new Observable<IDynamicSelectItem[]>(null),
      selectId: 'villageShip',
      placeholder: '...',
      optionLabel: 'title',
      showClear: true,
      filterBy: 'title',
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }
  }


  _onStateChange(event) {
    if (this.stateModel) {
      this.getList(this.iwService.readById(this.stateModel.id, 'townships'), this.townShip)
    }
  }
  _onTownShipChange(event) {
    if (this.townShipModel) {
      this.getList(this.iwService.readById(this.townShipModel.id, 'cities'), this.city)
    }
  }
  _onCityChange(event) {
    if (this.cityModel) {
      this.getList(this.iwService.readById(this.cityModel.id, 'villages'), this.village);
      this.disableButton = false;
    }
  }
  _onVillageChange(event) {
    if (this.villageModel) {
      this.getList(this.iwService.readById(this.villageModel.id, 'villageships'), this.villageShip)
    }
  }

  getList(res: Observable<any>, selectConfig: IDynamicSelect) {
    this.subscription.add(
      res.subscribe(result => {
        selectConfig.items = result;
      })
    )

  }
  getAddress(): string {
    return `${this.getStateStrign()}${this.getTownStrign()}${this.getCityStrign()}${this.getVillageStrign()}${this.getVillageShipStrign()}`
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

  submit() {
    // this.disableButton = true;
    // this.sub.add(
    //   this.iwService.update(this.getAddress()).subscribe({
    //     next: (res) => {
    //       this.shService.showSuccess();
    //       this.activeModal.close(true);
    //     },
    //     error: (err) => {
    //       this.shService.showError();
    //       this.disableButton = false;
    //     }
    //   })
    // );

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
          this.iwService.delete(id).subscribe({
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
