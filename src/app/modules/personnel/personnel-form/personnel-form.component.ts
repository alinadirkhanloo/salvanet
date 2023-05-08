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
import { PersonnelService } from '../personnel.service';
import { GenericClass } from 'app/core/models/genericClass.model';
import { SharedService } from 'app/shared/services/shared.service';


@Component({
  selector: 'app-personnel-form',
  templateUrl: './personnel-form.component.html',
  styleUrls: ['./personnel-form.component.css']
})
export class PersonnelFormComponent extends GenericClass implements OnInit,OnDestroy{

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
    private pService:PersonnelService,private route: ActivatedRoute,
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
      residencePlaceId: ['', [Validators.required]],
      residencePlaceTitle: ['', [Validators.required]],
      religion: ['', [Validators.required]],
      sect: [null],
      militaryStatus: ['', [Validators.required]],
      maritalStatus: ['', [Validators.required]],
      numberOfChildren: [null, [Validators.required]],
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
        this.loadById(params['id']);
      }else {
        this.loading = false;
      }
    });
  }

  loadById(id:number|string) {
    let res = this.pService.readById(id).subscribe({
      next:(result)=>{
        this.loading = false;
        this.setDataToForm(result);
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
            console.log(result);
            if (result) {
              this.accountForm.controls[idControlName].setValue(result.data);
            this.accountForm.controls[titleControlname].setValue(result.label);
            }
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

        },);
  }

  submitPerson(){
    return  this.pService.create(this.accountForm.value);
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


  cancle() {
    // this.router.navigate(['/pages/personnel']);
    console.log(this.accountForm.value);

  }


  ngOnDestroy() {

    this.unsubscription();
    if (this.ref) {
      this.ref.close();
    }
  }

  get checkCodeMelli() {
    return this.commonService.checkCodeMelli(this.accountForm.controls['nationalCode'].value);
  }

}
