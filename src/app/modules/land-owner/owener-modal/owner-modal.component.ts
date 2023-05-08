import { map } from 'rxjs';

import { OwnersService } from '../owners/owners.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PersonComponent } from 'app/core/components/user-find-box/person/person.component';
import { SharedService } from 'app/shared/services/shared.service';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'owner-selector',
  templateUrl: './owner-modal.component.html'
})
export class OwnerModalComponent implements OnInit {
  
  ownerId=null;
  owner=null;
  user=null;
  percent=null;
  updateMode = false;
  pId=0;
  firstName:String='';
  lastName:String='';
  constructor(
    private poService: OwnersService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
    private acModal:NgbActiveModal,
    private sh:SharedService,
    private confirmationService: ConfirmationService
  ) {
  }


  ngOnInit(): void {
    if (this.updateMode) {
      this.poService.readById(this.ownerId).pipe(
        map(result=>{
          this.poService.readById(result.partyId,'','person').subscribe(res=>{
            this.firstName = res.firstName;
            this.lastName = res.lastName;
          })

          return result;
        })
      ).subscribe(res=>{

        this.percent = res.percentage;
        this.owner = res;

      });
    }
  }

  opemPersonFilter() {
    const modalRef = this.modalService.open(PersonComponent, { fullscreen: true });
    modalRef.result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      this.user=result;
      this.firstName = result.firstName;
      this.lastName = result.lastName;

    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    },);
  }

  redirectToRegistration(){
    this.router.navigateByUrl('/pages/person/new');
  }

  submit() {
    if (this.updateMode) {
      this.owner.percentage = this.percent;
      let rest = this.poService.update(this.owner);
      let restSub =rest.subscribe({
        next: (result) => {
          this.sh.showSuccess('مالک ویرایش شد');
          
          this.acModal.close(true);
        },
        error: (error) => {
          this.acModal.close(false);
        },
        complete() {
          restSub.unsubscribe();
        }
      });
    }else {
      let temp ={
        id: null,
        percentage: this.percent,
        productionUnitId: this.pId,
        partyId: this.user.id
      }
      let rest = this.poService.create(temp);
      let restSub =rest.subscribe({
        next: (result) => {
          this.sh.showSuccess('مالک اضافه شد');
          this.acModal.close(true);
        },
        error: (error) => {
          this.acModal.close(false);
        }
      });
    }
      

  }
  

  confirmSubmit(event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      header:`مدعی گرامی مالکیت :`,
      message: `"
      با انتخاب گزینه تایید و ارسال، اطلاعات زمین کشاورزی وارد شده به وسیله شما برای تایید صحت و به کارگیری در سامانه به هسته علمی روستای محل استقرار زمین کشاورزی که مشخص نموده اید ارسال می شود
      .
      آیا با ادامه کار موافق هستید ؟"				
      `,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'تایید و ارسال',
      rejectLabel:'خیر',
      acceptButtonStyleClass:'mx-2',
      
      accept: () => {
        this.submit();
      },
      reject: () => {
        //reject action
      }
    });
  }

  cancle(){
    this.acModal.dismiss();
  }

  get fullName(){
    return `${this.firstName} ${this.lastName}`;
  }
}
