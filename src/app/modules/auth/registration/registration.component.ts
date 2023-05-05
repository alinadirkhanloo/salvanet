import { IPerson } from './../../../core/interfaces/person.interface';
import { CommonService } from 'core/services/common/common.service';
import { ReplaySubject } from 'rxjs';
import { IDynamicTree } from 'app/core/components/dynamics/dynamic-tree/dynamic-tree.interface';
import { AuthService } from 'core/services/auth/auth.service';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FindBoxComponent } from 'app/core/components/find-box/find-box.component';
import { SelectionMode } from 'app/core/enums/dynamic-tree.enum';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit, OnDestroy {
  accountForm: FormGroup;
  disableButton = false;
  disableActiveationButton = false;
  ref: DynamicDialogRef;
  display = false;

  public treeConfig: IDynamicTree;
  constructor(
    private _formBuilder: FormBuilder, private modalService: NgbModal, private _sh: SharedService,
    private router: Router, private commonService: CommonService,
    public dialogService: DialogService, private auth: AuthService
  ) {
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
      sect: ['', [Validators.required]],
      militaryStatus: ['', [Validators.required]],
      maritalStatus: ['', [Validators.required]],
      numberOfChildren: ['', [Validators.required]],
      employmentStatus: ['', [Validators.required]],
      levelOfEducation: ['', [Validators.required]],
      studying: ['', [Validators.required]],
      address: ['', [Validators.required]],
      simnumber: ['', [Validators.required]],
      id: -1
    });
  }


  ngOnInit(): void {
    
    let username = this.auth.getUsername();
    if (!username || this._sh.returnUrl.value === '') {
      this.goToLogin();
    } else {
      this.auth.getPerson(username).subscribe(result=>{
        this.accountForm.controls['nationalCode'].setValue(result['nationalCode']);
        this.accountForm.controls['simnumber'].setValue(result['simnumber']);
        this.accountForm.controls['id'].setValue(result['id']);
      });

    }
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
      if (result) {
        this.accountForm.controls[idControlName].setValue(result.data);
        this.accountForm.controls[titleControlname].setValue(result.label);
      }

    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    },);
  }

  submitPerson() {
    let temp: IPerson = {
      nationalCode: this.accountForm.value.nationalCode,
      firstName: this.accountForm.value.firstName,
      lastName: this.accountForm.value.lastName,
      gender: this.accountForm.value.gender,
      identityCardNumber: this.accountForm.value.identityCardNumber,
      birthDate: this.accountForm.value.birthDate,
      religion: this.accountForm.value.religion,
      sect: this.accountForm.value.sect,
      militaryStatus: this.accountForm.value.militaryStatus,
      maritalStatus: this.accountForm.value.maritalStatus,
      employmentStatus: this.accountForm.value.employmentStatus,
      numberOfChildren: this.accountForm.value.numberOfChildren,
      levelOfEducation: this.accountForm.value.levelOfEducation,
      address: this.accountForm.value.address,
      birthPlaceId: this.accountForm.value.birthPlaceId,
      identityCardIssuingPlaceId: this.accountForm.value.identityCardIssuingPlaceId,
      nationalityId: this.accountForm.value.nationalityId,
      residencePlaceId: this.accountForm.value.residencePlaceId,
      simnumber: this.accountForm.value.simnumber,
      studying: this.accountForm.value.studying,
      id: this.accountForm.value.id
    };
    return this.auth.editPerson('updateForIdentityAcceptance',temp);
  }

  submitAsPerson() {

    //   Object.keys(temp).forEach(key => {
    //     temp[key] = this.accountForm.value[key];
    // });
    // console.log(temp);

     this.submitPerson().subscribe({
                next: (res) => {
                  this.router.navigate(['/role-determination']);
                  this._sh.showSuccess();
                },error:(err)=>{
                  this._sh.showError('خطا در ثبت اطلاعات');
                }
              });
  }

  submitAsCompany() {
    this.submitPerson().subscribe({
      next: (res) => {
        this.router.navigate(['/auth/company-registration']);
        this._sh.showSuccess();
      }, error: (err) => {
        this._sh.showError('خطا در ثبت اطلاعات');
      }
    });

  }

  goToLogin() {
    // console.log(this.accountForm.valid, this.accountForm.value);

    this.router.navigate(['/']);
  }

  show() {
    this.display = true;
  }



  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
