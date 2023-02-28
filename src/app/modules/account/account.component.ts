import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { GenericGrid } from 'app/core/interfaces/grid.interface';
import { IGridHeader } from 'app/core/interfaces/grid.interface';
import { AccountNewComponent } from './account-new/account-new.component';

import { Component, OnInit } from '@angular/core';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { IAccount } from 'app/core/interfaces/account.interface';
import { DialogService } from 'primeng/dynamicdialog';
import { AccountService } from './account.service';

@Component({
  selector: 'app-login',
  templateUrl: './account.component.html'
})
export class AccountComponent implements OnInit {
  theachingHeaders:IGridHeader[] = [
    {title:'idNumber',persianTitle:'کد ملی ',sortKey:'idNumber'},
    {title:'fullName',persianTitle:'نام و نام خانوادگی ',sortKey:'fullName'},
    {title:'phoneNumber',persianTitle:'شماره همراه ',sortKey:'phoneNumber'},
    {title:'username',persianTitle:'کد کاربری ',sortKey:'username'},
    {title:'isActive',persianTitle:'فعال',sortKey:'isActive'}
  ];


  lazyLoadvent!:LazyLoadEvent;
  first = 0;
  rows = 10;


  accountGrid = new GenericGrid(this.router,this.theachingHeaders);

  accountList: IAccount[]=[];
  accountSelectedList: IAccount[]=[];
  selectedAccounts: IAccount[]=[];

  private sub = new Subscription();

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,
    private accountService:AccountService
    ) {}

    ngOnInit() {
      this.loadAll(null);
    }
  
    loadAll(event){
      this.accountGrid.loading = true;
      this.loadDataSource(event);
    }
  
    loadDataSource(event: LazyLoadEvent) {
      if (event !== null) {
        this.lazyLoadvent = event;
        this.sub.add(
          this.accountService.readListWithParams((event.first/10),event.rows,event.sortField).subscribe({
            next:(list:any)=>{
              this.accountGrid.onLazyLoad(event,list);
              this.accountList=list;
            }
          })
          );
      }
    }
  

  onSelectAllChange(event) {
    this.accountSelectedList = this.accountGrid.selectAllChange(event,this.accountList);
  }

  showNewAccountModal() {
    const ref = this.dialogService.open(AccountNewComponent, {
      data: {
          id: '51gF3'
      },
      header: 'ایجاد حساب کاربری جدید',
      width: '40%'
  });
  }

  confirmSelectdAccountsDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'کاربر گرامی، آیا قصد حذف حساب های انتخاب شده را دارید؟',
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

  confirmAccountDelete(event: Event, name: string) {
    this.confirmationService.confirm({
      target: event.target,
      message: `کاربر گرامی، آیا قصد حذف حساب کاربری ${name} را دارید؟`,
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

  confirmAccountActivation(event: any,entity:any) {

    this.confirmationService.confirm({
      target: event.target,
      message: `کاربر گرامی، آیا قصد ${event.checked?'فعال سازی':'غیر فعال سازی'} حساب های انتخاب شده را دارید؟`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'بله',
      rejectLabel:'خیر',
      acceptButtonStyleClass:'mx-2',
      accept: () => {
        //confirm action
      },
      reject: () => {
        entity.isActive = !entity.isActive;
        //reject action
      }
    });
  }

  get accountListLength():boolean{
    return this.accountList.length>0;
  }

  get disableButtons():boolean{
    return this.accountSelectedList.length>0;
  }

}
