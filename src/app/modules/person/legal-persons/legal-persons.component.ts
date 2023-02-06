import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { GenericGrid, IGridHeader } from 'app/core/interfaces/grid.interface';
import { Component, OnInit } from '@angular/core';
import { IPerson } from 'app/core/interfaces/person.interface';
import { LegalPersonService } from './legal-person.service';

@Component({
  selector: 'app-legal-persons',
  templateUrl: './legal-persons.component.html',
  styleUrls: ['./legal-persons.component.css']
})
export class LegalPersonsComponent   implements OnInit {

  gridHeaders:IGridHeader[] = [
    {title:'firstName',persianTitle:'نام',sortKey:'firstName'},
    {title:'lastName',persianTitle:'نام خانوادگي',sortKey:'lastName'},
    {title:'gender',persianTitle:'جنسيت',sortKey:'gender'},
    {title:'identityCardNumber',persianTitle:'شماره شناسنامه',sortKey:'identityCardNumber'},
    {title:'birthDate',persianTitle:'تاريخ تولد',sortKey:'birthDate'},
    {title:'religion',persianTitle:'دين',sortKey:'religion'},
    {title:'sect',persianTitle:'مذهب',sortKey:'sect'},
    {title:'militaryStatus',persianTitle:'وضعيت سربازي',sortKey:'militaryStatus'},
    {title:'maritalStatus',persianTitle:'وضعيت تاهل',sortKey:'maritalStatus'},
    {title:'employmentStatus',persianTitle:'وضعيت اشتغال',sortKey:'employmentStatus'},
    {title:'numberOfChildren',persianTitle:'تعداد فرزندان',sortKey:'numberOfChildren'},
    {title:'isStudying',persianTitle:'مشغول به تحصيل',sortKey:'isStudying'},
    {title:'levelOfEducation',persianTitle:'سطح تحصيلات',sortKey:'levelOfEducation'}
  ];

  genders=[
    {label:'مرد',value:1},
    {label:'زن',value:2}
  ]

  religions=[
    {label:'اسلام',value:1},
    {label:'مسیحیت',value:2}
  ]

  sects=[
    {label:'شیعه',value:1},
    {label:'سنی',value:2}
  ]
  militaryStatuses=[
    {label:'معاف',value:1},
    {label:'در حال خدمت',value:2},
    {label:'پایان خدمت',value:3}
  ]
  maritalStatuses=[
    {label:'مجرد',value:1},
    {label:'متاهل',value:2}
  ]

  employmentStatuses=[
    {label:'کارمند',value:1},
    {label:'آزاد',value:2}
  ]

  studyingStatuses=[
    {label:'درحال تحصیل',value:true},
    {label:'فارغ التحصیل',value:false}
  ]

  levelOfEducationes=[
    {label:'درحال تحصیل',value:1},
    {label:'فارغ التحصیل',value:2}
  ]



  dataGrid = new GenericGrid(this.router,this.gridHeaders);

  dataSource: IPerson[]=[];
  selectedList: IPerson[]=[];

  constructor(
    private confirmationService: ConfirmationService,
    public dialogService: DialogService,
    private router:Router,
    private personService:LegalPersonService
    ) {}

  ngOnInit() {
    this.dataGrid.loading = true;
    this.loadDataSource(null)
  }

  loadDataSource(event: LazyLoadEvent) {
    this.personService.getList().subscribe({
      next:(list)=>{
        this.dataGrid.onLazyLoad(event,list);
        this.dataSource=list.data;
        console.log(this.dataSource);
      }
    });
  }

  onSelectAllChange(event) {
    this.selectedList = this.dataGrid.selectAllChange(event,this.dataSource);
  }


  confirmSelectdDelete(event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'کاربر گرامی، آیا قصد حذف تدریس های انتخاب شده را دارید؟',
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

  confirmDelete(event: Event, id: string) {
    this.confirmationService.confirm({
      target: event.target,
      message: `کاربر گرامی، آیا قصد حذف تدریس را دارید؟`,
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
