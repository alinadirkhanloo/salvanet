import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent, MenuItem } from 'primeng/api';
import { Component, OnInit } from '@angular/core';
import { IGridHeader, GenericGrid } from 'app/core/interfaces/grid.interface';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'app/shared/services/shared.service';
import { IPosition } from 'app/core/interfaces/position.interface';
import { PositionService } from './position.service';
import { PositionIncumbentComponent } from '../position-incumbent/position-incumbent.component';
import { PositionStatusComponent } from '../position-status/position-status.component';

@Component({
  selector: 'app-position',
  templateUrl: './position.component.html',
  styleUrls: ['./position.component.css']
})
export class PositionComponent implements OnInit{
    private sub = new Subscription();

    gridHeaders:IGridHeader[] = [
      {title:'name',persianTitle:'عنوان سمت',sortKey:'name'},
      {title:'nationalCode',persianTitle:'کد ملی متصدی',sortKey:'nationalCode'},
      {title:'firstName',persianTitle:'نام متصدی',sortKey:'firstName'},
      {title:'lastName',persianTitle:' نام خانوادگی متصدی',sortKey:'lastName'}
    ];
    items: MenuItem[];

    dataGrid = new GenericGrid(this.router,this.gridHeaders);

    dataSource: IPosition[]=[];
    selectedList: IPosition[]=[];
    position=null;
    first = 0;
    rows = 10;
    id=0;
    lazyLoadvent!:LazyLoadEvent;
    constructor(
      private confirmationService: ConfirmationService,
      public dialogService: DialogService,
      private router:Router,
      private pService:PositionService,
      private modalService:NgbModal,
      private shService:SharedService,
      private route: ActivatedRoute
      ) {}

    ngOnInit() {
      let routeSub = this.route.params.subscribe(params => {
        if (params['id']) {
          this.id=params['id'];
        }
      });
      this.loadAll(null);
      this.items = [
        {
          label: 'انتصاب متصدی',
          icon: 'pi pi-user ml-2',
          command: (event) => {this.openProductForm(event)}
      },
      {
          label: 'انفصال متصدی',
          icon: 'pi pi-times ml-2',
          command: (event) => {this.enfesalUser(event)}
      },
        {
          label: 'غیر فعال سازی',
          icon: 'pi pi-times ml-2',
          command: (event)=>{this.activeUser(event)}
      },
      {
        label: 'فعال سازی',
        icon: 'pi pi-check ml-2',
        command: (event)=>{this.deactiveUser(event);}
    },
    {
      label: 'سابقه سمت',
      icon: 'pi pi-calendar ml-2',
      command: (event)=>{}
  },

    ];
    }

    loadAll(event){
      this.dataGrid.loading = true;
      this.loadDataSource(event);
    }

    loadDataSource(event: LazyLoadEvent) {
      if (event !== null) {
        this.lazyLoadvent = event;
        console.log('x');
        // this.sub.add(
          this.pService.readListWithParams((event.first/10),event.rows,event.sortField,`organizationPositions/${this.id}`).subscribe(
            list =>{
              console.log(list);

              if (list) {
                this.dataGrid.onLazyLoad(event,list);
              this.dataSource=list;
              }
            }
          )
          // );
      }
    }

    enfesalUser(event){
      this.pService.readById(this.position.id).subscribe(res=>{
        if (res) {
          const temp =res;
          temp.holdsById = null;
          this.pService.update(temp).subscribe(res=>{
            if (res) {
              this.loadAll(this.lazyLoadvent);
              this.shService.showSuccess('انفصال انجام شد');
            }
          });
        }
      })
    }
    activeUser(event){
      this.pService.readById(this.position.id).subscribe(res=>{
        if (res) {
          const temp =res;
          temp.isActive = true;
          this.pService.update(temp).subscribe(res=>{
            if (res) {
              this.shService.showSuccess('فعال سازی انجام شد');
            }
          });
        }
      })
    }
    deactiveUser(event){
      this.pService.readById(this.position.id).subscribe(res=>{
        if (res) {
          const temp =res;
          temp.isActive = false;
          this.pService.update(temp).subscribe(res=>{
            if (res) {
              this.shService.showSuccess('غیرفعال سازی انجام شد');
            }
          });
        }
      })
    }

    openProductForm(event:any){
      let modalRef = this.modalService.open(PositionIncumbentComponent,{size:'lg'});
      modalRef.componentInstance.updateMode=false;
      modalRef.componentInstance.label=event.item.label;
      modalRef.componentInstance.positionLabel=this.position.name;
      modalRef.componentInstance.positionId=this.position.id;
      modalRef.componentInstance.id=0;
      modalRef.result?.then(result=>{
        if (result) {
          this.loadAll(this.lazyLoadvent);
        }
      }).catch(a=>{})
    }

    openPositionStatus(event:any){

      let modalRef = this.modalService.open(PositionStatusComponent,{size:'lg'});
      modalRef.componentInstance.updateMode=true;
      modalRef.componentInstance.label=event.item.label;
      modalRef.componentInstance.positionLabel=this.position.name;
      modalRef.componentInstance.positionId=this.position.id;
    }

    onSelectAllChange(event) {
      this.selectedList = this.dataGrid.selectAllChange(event,this.dataSource);
    }

setPosition(item:any){
  this.position = item;
}
    confirmSelectdThesisDelete(event: Event) {
      this.confirmationService.confirm({
        target: event.target,
        message: 'کاربر گرامی، آیا قصد حذف محصولات انتخاب شده را دارید؟',
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

    confirmThesisDelete(event: Event, id: string|number) {
      this.confirmationService.confirm({
        target: event.target,
        message: `کاربر گرامی، آیا قصد حذف محصول را دارید؟`,
        icon: 'pi pi-exclamation-triangle',
        acceptLabel:'بله',
        rejectLabel:'خیر',
        acceptButtonStyleClass:'mx-2',
        accept: () => {
          //confirm action
          this.sub.add(
            this.pService.delete(id).subscribe({
              next:(res)=>{
                this.shService.showSuccess();
              },
              error:(err)=>{
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
