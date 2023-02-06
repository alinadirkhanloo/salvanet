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
  accountGrid = new GenericGrid(this.router,this.theachingHeaders);

  accountList: IAccount[]=[];
  accountSelectedList: IAccount[]=[];
  selectedAccounts: IAccount[]=[];

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,
    private accountService:AccountService
    ) {}

  ngOnInit() {
    this.accountGrid.loading = true;
    this.loadDataSource(null)
  }

  loadDataSource(event: LazyLoadEvent) {
    this.accountService.getList().subscribe({
      next:(list)=>{
        this.accountGrid.onLazyLoad(event,list);
        this.accountList=list.data;
      }
    });
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

  confirmAccountActivation(event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'کاربر گرامی، آیا قصد فعال سازی حساب های انتخاب شده را دارید؟',
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
