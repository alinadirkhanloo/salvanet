import { FindBoxComponent } from 'app/core/components/find-box/find-box.component';
import { SelectionMode } from 'app/core/enums/dynamic-tree.enum';
import { IDynamicTree } from 'app/core/components/dynamics/dynamic-tree/dynamic-tree.interface';
import { CommonService } from 'app/core/services/common/common.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDropdown } from 'core/interfaces/dropdown/dropdonw.interface';
import { IDynamicPickList } from 'core/components/dynamics/dynamic-pick-list/dynamic-pick-list.interface';
import { IDynamicSelect, IDynamicSelectItem } from 'core/components/dynamics/dynamic-select/dynamic-select.interface';
import { IRegistrationAnnouncement } from 'core/interfaces/registration-announcement.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegistrationAnnouncementService } from '../registration-announcement.service';
import { Subscription, ReplaySubject, map } from 'rxjs';
import { Roles } from '../registration-announcement.interface';
import { SharedService } from 'app/shared/services/shared.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-registration-announcement-edit',
  templateUrl: './registration-announcement-edit.component.html',
  styleUrls: ['./registration-announcement-edit.component.css']
})
export class RegistrationAnnouncementEditComponent implements OnInit,OnDestroy {

  private su = new Subscription();
  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  public roleSelectorConfig!: IDynamicSelect;
  public roleModel: IDynamicSelectItem;
  public pickListConfigs!: IDynamicPickList;
  stateConfig !: IDynamicSelect;
  roles: IDropdown[] = Roles;
  cities=[];
  showForm = true;
  public treeConfig: IDynamicTree;
  regId=0;
  constructor(
    private confirmationService: ConfirmationService,
    private _formBuilder: FormBuilder,private modalService:NgbModal,private shardeService:SharedService,
    private registrationAnnouncementService: RegistrationAnnouncementService,
    private route: ActivatedRoute, private router:Router,private commonService: CommonService
  ) {

    this.editForm = this._formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(36)]],
      startDate: ['', [Validators.required, Validators.maxLength(11)]],
      endDate: ['', [Validators.required, Validators.maxLength(11)]],
      roleId: ['', [Validators.required]],
      active: [false,[]],
      description: ['', [Validators.required, Validators.maxLength(64)]],
      code: ['', [Validators.required, Validators.maxLength(8)]],
      id:null
    });
  }
  ngOnDestroy(): void {
    this.su.unsubscribe();
  }


  ngOnInit(): void {

    this.su.add(this.route.params.subscribe(params => {
      if (params['id']) {
        this.updateMode = true;
        this.loadById(params['id']);
      }
    }));
  }


  loadById(id:number|string) {
    this.su.add(this.registrationAnnouncementService.readById(id).pipe(
      map(
        (res) => {
      this.registrationAnnouncementService.
      readById(id,'',
      `countryDivision/registrationAnnouncementCountryDivisions`).subscribe(result=>{
        console.log('fadsfa',result);
        this.cities = result;
      });
        return res;
      }
      )).
      subscribe({
      next:(result)=>{
        console.log(result);

        this.setDataToForm(result);
      },
      error(err) {

      }
    }));
  }

  setDataToForm(entityData:any) {
    this.editForm.setValue(entityData as IRegistrationAnnouncement[]);
  }

  openFindBox(idControlName: string, titleControlname: string, url, title: string) {
    this.treeConfig = {

      treeNodes$: this.commonService.getTree(url),

      onNodeContextMenuSelect: new ReplaySubject<any>(1),
      onNodeSelect: new ReplaySubject<any>(1),

      lazyUrl: [
        `${url}`,
        ``,
      ],

      selectionMode: SelectionMode.SINGLE_SELECT
    };

    const modalRef = this.modalService.open(FindBoxComponent, { size: 'lg' });
    modalRef.componentInstance.treeConfig = this.treeConfig;
    modalRef.componentInstance.title = title;
    modalRef.result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      let y=false;
      if (result) {

        let x ={name:result.label,id:result.data};

        if (this.regId) {
            this.registrationAnnouncementService.create(this.cities,`assignCountryDivisions/${this.regId}/${x.id}`)
          .subscribe(res=>{
            // if (res) {
              this.shardeService.showSuccess('زیرمجموعه مورد نظر اضافه شد');
            this.cities.push(x);
              y=true;
            // }
          });
        }

      }

    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    },);
  }

  submit() {

    if (this.editForm.valid) {
      this.disableButton = true;
      let rest = !this.updateMode?this.registrationAnnouncementService.
      create(this.editForm.value) : this.registrationAnnouncementService.
      update(this.editForm.value);
      this.su.add(rest.subscribe({
        next: (result) => {
          this.disableButton = false;
          this.regId = result.id;
          this.showForm = !this.showForm;

        },
        error: (error) => {
            this.disableButton = false;
            this.shardeService.showError();
          }
      }));
    }
  }

  cancle(){
    this.router.navigate(['pages/registration-announcement']);
  }


  confirmDelete(event: Event, id: string) {
    this.confirmationService.confirm({
      target: event.target,
      message: `کاربر گرامی، آیا قصد حذف زیرمجموعه را دارید؟`,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'بله',
      rejectLabel:'خیر',
      acceptButtonStyleClass:'mx-2',
      accept: () => {
        this.deleteDivision(id);
        //confirm action
      },
      reject: () => {
        //reject action
      }
    });
  }

  // submit2(){
  //   let y=false;
  //   if (this.regId) {
  //     for (let item of this.cities) {
  //       this.registrationAnnouncementService.create(this.cities,`assignCountryDivisions/${this.regId}/${item.id}`)
  //     .subscribe(res=>{
  //       if (res) {
  //         y=true;
  //       }
  //     });
  //     }
  //   }
  //   setTimeout(() => {
  //     if (y) {
  //       this.shardeService.showSuccess();
  //       this.router.navigate(['pages/registration-announcement']);
  //     }

  //   }, 3000);
  // }

  deleteDivision(id){
    if (this.regId) {
      for (let index = 0; index < this.cities.length; index++) {
        this.registrationAnnouncementService.deleteWithoutId('',`registrationAnnouncement/unAssignCountryDivisions/${this.regId}/${id}`)
      .subscribe(res=>{
        let i = this.cities.findIndex(m=>{return m.id===id});
        this.cities.splice(i,1);
      });
      }
    }
  }

}
