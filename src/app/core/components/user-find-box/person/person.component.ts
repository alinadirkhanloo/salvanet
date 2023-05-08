import { SharedService } from 'app/shared/services/shared.service';
import { Subscription, map } from 'rxjs';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { GenericGrid, IGridHeader } from 'app/core/interfaces/grid.interface';
import { Component, OnInit } from '@angular/core';
import { IPerson } from 'app/core/interfaces/person.interface';
import { PersonService } from './person.service';
import { FormControl } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css']
})
export class PersonComponent implements OnInit {

  private sub = new Subscription();

  gridHeaders: IGridHeader[] = [
    { title: 'nationalCode', persianTitle: 'کد ملی', sortKey: 'nationalCode' },
    { title: 'firstName', persianTitle: 'نام', sortKey: 'firstName' },
    { title: 'lastName', persianTitle: 'نام خانوادگي', sortKey: 'lastName' },
    { title: 'identityCardNumber', persianTitle: 'شماره شناسنامه', sortKey: 'identityCardNumber' },
    { title: 'simnumber', persianTitle: 'شماره تماس', sortKey: 'simnumber' }
  ];




  dataGrid = new GenericGrid(this.router, this.gridHeaders);
  nationalCode: FormControl = new FormControl('');
  dataSource: IPerson[] = [];
  selectedList: IPerson[] = [];
  totalCount: number = 0;
  first = 0;
  rows = 10;
  lazyLoadvent!: LazyLoadEvent;
  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router: Router,
    private pService: PersonService,
    private shService: SharedService,
    private acModal:NgbActiveModal
  ) { }

  ngOnInit() {
    this.loadAll(null);
  }

  loadAll(event) {
    this.dataGrid.loading = true;
    this.loadDataSource(event);
  }

  loadDataSource(event: LazyLoadEvent) {
    if (event !== null) {
      this.lazyLoadvent = event;
      this.sub.add(
        this.pService.getListCount('count').pipe(
          map((rsult) => {
            this.totalCount = rsult;
            this.pService.readListWithParams((event.first / 10), event.rows, event.sortField).subscribe({
              next: (list: any) => {
                this.dataGrid.onLazyLoad(event, list, this.totalCount);
                this.dataSource = list;
              }
            })
            return rsult;
          })
        ).subscribe({})
      );
    }
  }

  searchUser() {
    let code = this.nationalCode.value;
    if (code.length==10) {
      this.sub.add(
        this.pService.getListCount(`nationalCode/${this.nationalCode.value}`).subscribe({
          next:(value)=> {
            this.dataGrid.onLazyLoad(this.lazyLoadvent, [value], 1);
            this.dataSource = [value];
          },
          error(err) {
            console.log(err);
          },
        })
      );
    }else {
      this.loadAll(this.lazyLoadvent);
    }

  }

  onSelectAllChange(event) {
    this.selectedList = this.dataGrid.selectAllChange(event, this.dataSource);
  }

  selectUser(event: Event,row:any) {
    this.acModal.close(row);
  }

}
