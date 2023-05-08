import { IPerson } from 'app/core/interfaces/person.interface';
import { ReplaySubject } from 'rxjs';
import { SelectionMode } from 'app/core/enums/dynamic-tree.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDynamicTree } from 'app/core/components/dynamics/dynamic-tree/dynamic-tree.interface';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from 'app/core/services/common/common.service';
import { FindBoxComponent } from 'app/core/components/find-box/find-box.component';
import { PersonService } from '../person.service';
import { SharedService } from 'app/shared/services/shared.service';
import { GenericClass } from 'app/core/models/genericClass.model';

@Component({
  selector: 'app-person-edit',
  templateUrl: './person-edit.component.html',
  styleUrls: ['./person-edit.component.css']
})
export class PersonEditComponent extends GenericClass implements OnInit,OnDestroy{

  updateMode = false;
  routeSub=null;
  loading = true;
  accountForm: FormGroup;
  disableButton = false;
  disableActiveationButton = false;
  id=0;
  ref: DynamicDialogRef;
  public treeConfig: IDynamicTree;

  constructor(
    private _formBuilder: FormBuilder, private modalService: NgbModal,
    private pService:PersonService,private route: ActivatedRoute,
    private shService:SharedService,
    private router: Router,private commonService:CommonService,
    public dialogService: DialogService
  ) {
    super();
    this.accountForm = this._formBuilder.group({
      id:-1,
      nationalCode: ['', [Validators.required]],
      firstName: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      identityCardNumber: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      birthPlaceId: ['', [Validators.required]],
      birthPlaceTitle: ['', [Validators.required]],
      identityCardIssuingPlaceId: ['', [Validators.required]],
      identityCardIssuingPlaceTitle: ['', [Validators.required]],
      nationalityId: ['', [Validators.required]],
      residencePlaceId: ['', [Validators.required]],
      residencePlaceTitle: ['', [Validators.required]],
      religion: ['', [Validators.required]],
      sect: [null],
      militaryStatus: ['', [Validators.required]],
      maritalStatus: ['', [Validators.required]],
      numberOfChildren: [null],
      employmentStatus: ['', [Validators.required]],
      levelOfEducation: ['', [Validators.required]],
      studying: [''],
      address: ['', [Validators.required]],
      simnumber: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.updateMode = true;
        this.id = params['id'];
        this.loadById(params['id']);
      }else {
        this.loading = false;
      }
    });
  }

  loadById(id:number|string) {
    let res = this.pService.readById(id).subscribe({
      next:(result)=>{

        this.setDataToForm(result);
        this.loading = false;
      },
      error(err) {},
      complete() {
        res.unsubscribe();
      },
    });
  }



  openFindBox(idControlName:string,titleControlname:string,url:string,expandUrl:string,title:string) {
    this.treeConfig = {

          treeNodes$: this.commonService.getTree(url),

          onNodeContextMenuSelect: new ReplaySubject<any>(1),
          onNodeSelect: new ReplaySubject<any>(1),

          lazyUrl: [
            expandUrl,''
          ],

          selectionMode: SelectionMode.SINGLE_SELECT
        };

        const modalRef = this.modalService.open(FindBoxComponent, { size: 'lg' });
        modalRef.componentInstance.treeConfig = this.treeConfig;
        modalRef.componentInstance.title = title;
        modalRef.result.then((result) => {
          // this.closeResult = `Closed with: ${result}`;
            if (result) {
              this.accountForm.controls[idControlName].setValue(result.data);
            this.accountForm.controls[titleControlname].setValue(result.label);
            }
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

        },);
  }



  submitAsPerson() {
   this.subscription=  this.pService.update(this.accountForm.value).subscribe({
              next: (res) => {
                this.router.navigate(['pages/persons']);
                this.shService.showSuccess();
              },error:(err)=>{
              }
            });
  }


  cancle() {
    this.router.navigate(['pages/persons']);
  }


  ngOnDestroy() {

    this.unsubscription();
    if (this.ref) {
      this.ref.close();
    }
  }

  get checKCodeMelli() {
    console.log(this.commonService.checkCodeMelli(this.accountForm.controls['nationalCode'].value));

    return this.commonService.checkCodeMelli(this.accountForm.controls['nationalCode'].value);
  }


  setDataToForm(entityData:any) {

    this.f['id'].setValue(entityData['id']);
    this.f['nationalCode'].setValue(entityData['nationalCode']);
    this.f['firstName'].setValue(entityData['firstName']);
    this.f['lastName'].setValue(entityData['lastName']);
    this.f['gender'].setValue(entityData['gender']);
    this.f['identityCardNumber'].setValue(entityData['identityCardNumber']);
    this.f['birthDate'].setValue(entityData['birthDate']);
    this.f['birthPlaceId'].setValue(entityData['birthPlaceId']);
    this.f['religion'].setValue(entityData['religion']);
    this.f['sect'].setValue(entityData['sect']);
    this.f['militaryStatus'].setValue(entityData['militaryStatus']);
    this.f['maritalStatus'].setValue(entityData['maritalStatus']);
    this.f['employmentStatus'].setValue(entityData['employmentStatus']);
    this.f['numberOfChildren'].setValue(entityData['numberOfChildren']);
    this.f['studying'].setValue(entityData['studying']);
    this.f['levelOfEducation'].setValue(entityData['levelOfEducation']);
    this.f['address'].setValue(entityData['address']);
    this.f['identityCardIssuingPlaceId'].setValue(entityData['identityCardIssuingPlaceId']);
    this.f['nationalityId'].setValue(entityData['nationalityId']);
    this.f['residencePlaceId'].setValue(entityData['residencePlaceId']);
    this.f['simnumber'].setValue(entityData['simnumber']);
  }


private get f() {
  return this.accountForm.controls;
}

showInput(data:any){
  return 1 === Number(data);
}
}
