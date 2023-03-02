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
      nationalityTitle: ['', [Validators.required]],
      residencePlaceId: ['', [Validators.required]],
      religion: ['', [Validators.required]],
      sect: ['', [Validators.required]],
      militaryStatus: ['', [Validators.required]],
      maritalStatus: ['', [Validators.required]],
      numberOfChildren: ['', [Validators.required]],
      employmentStatus: ['', [Validators.required]],
      levelOfEducation: ['', [Validators.required]],
      studying: ['', [Validators.required]],
      address: ['', [Validators.required]],
      simnumber: ['', [Validators.required]],
      id: -1,
      profileId: -1
    });
  }
  
  ngOnInit(): void { 
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.updateMode = true;
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

  setDataToForm(entityData:any) {
    this.accountForm.setValue(entityData as IPerson[]);
  }
  
  openFindBox(idControlName:string,titleControlname:string,url,title:string) {
    this.treeConfig = {

          treeNodes$: this.commonService.getTree(url),

          onNodeContextMenuSelect: new ReplaySubject<any>(1),
          onNodeSelect: new ReplaySubject<any>(1),

          lazyUrl: [
            `${url}`,
            '',
          ],

          selectionMode: SelectionMode.SINGLE_SELECT
        };

        const modalRef = this.modalService.open(FindBoxComponent, { size: 'lg' });
        modalRef.componentInstance.treeConfig = this.treeConfig;
        modalRef.componentInstance.title = title;
        modalRef.result.then((result) => {
          // this.closeResult = `Closed with: ${result}`;
            console.log(result);
            this.accountForm.controls[idControlName].setValue(result.data);
            this.accountForm.controls[titleControlname].setValue(result.label);
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

        },);
  }

  submitPerson(){
    return  this.pService.create(this.accountForm.value)
  }

  submitAsPerson() {
   this.subscription= this.submitPerson().subscribe({
              next: (res) => {
                this.router.navigate(['/role-determination']);
                this.shService.showSuccess();
              },error:(err)=>{
              }
            });
  }


  goToLogin() {
    this.router.navigate(['/pages/personnel']);
  }


  ngOnDestroy() {

    this.unsubscription();
    if (this.ref) {
      this.ref.close();
    }
  }
}
