import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { ISimCard } from 'app/core/interfaces/sim-card.interface';
import { DialogService } from 'primeng/dynamicdialog';
import { SimCardService } from './sim-card.service';
import { GenericGrid, IGridHeader } from 'app/core/interfaces/grid.interface';


@Component({
  selector: 'app-sim-card',
  templateUrl: './sim-card.component.html',
  styleUrls: ['./sim-card.component.css']
})
export class SimCardComponent {
  
  headers:IGridHeader[] = [
    {title:'operator',persianTitle:'اپراتو',sortKey:'operator'},
    {title:'phoneNumber',persianTitle:'شماره تلفن',sortKey:'phoneNumber'},
    {title:'isActive',persianTitle:'فعال',sortKey:'isActive'}
  ];
  simCardGrid = new GenericGrid(this.router,this.headers);

  simCardList: ISimCard[]=[];
  simCardSelectedList: ISimCard[]=[];
  selectedSimCard: ISimCard[]=[];

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,
    private simCardService:SimCardService
    ) {}

  ngOnInit() {
    this.simCardGrid.loading = true;
    this.loadDataSource(null)
  }

  loadDataSource(event: LazyLoadEvent) {
    this.simCardService.getList().subscribe({
      next:(list)=>{
        this.simCardGrid.onLazyLoad(event,list);
        this.simCardList=list.data;
      }
    });
  }

  onSelectAllChange(event) {
    this.simCardSelectedList = this.simCardGrid.selectAllChange(event,this.simCardList);
  }

  confirmSelectdSimCardsDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'کاربر گرامی، آیا قصد حذف سیم کارت های انتخاب شده را دارید؟',
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

  confirmSimCardDelete(event: Event, phoneNumber: number) {
    this.confirmationService.confirm({
      target: event.target,
      message: `کاربر گرامی، آیا قصد حذف سیم کارت ${phoneNumber} را دارید؟`,
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
