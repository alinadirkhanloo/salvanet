import { CommonService } from 'core/services/common/common.service';
import { ReplaySubject } from 'rxjs';
import { IDynamicTree } from 'app/core/components/dynamics/dynamic-tree/dynamic-tree.interface';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'core/services/auth/auth.service';
import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { ActivatedRoute, Router } from '@angular/router';
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
export class RegistrationComponent implements OnInit,OnDestroy{
  accountForm: FormGroup;
  disableButton = false;
  disableActiveationButton = false;
  ref: DynamicDialogRef;
  display=false;

  public treeConfig: IDynamicTree;
  constructor(
    private _formBuilder: FormBuilder, private modalService: NgbModal,private _sh: SharedService,
    private router: Router,private commonService:CommonService,
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
      simnumber: ['', [Validators.required,Validators.pattern(`^09[0-9]{9}`), Validators.maxLength(11),Validators.minLength(11)]],
      id: -1,
      profileId: -1
    });
  }


  ngOnInit(): void {
    let usename = this.auth.getUsername();
    if (!usename) {
      this.goToLogin();
    } else this.accountForm.controls['nationalCode'].setValue(usename);
  }


  openFindBox(idControlName:string,titleControlname:string,url,title:string) {
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

  submitPerson(){
    return  this.auth.submitPerson(this.accountForm.value)
  }

  submitAsPerson() {
   this.submitPerson().subscribe({
              next: (res) => {
                this.router.navigate(['/role-determination']);
                this._sh.showSuccess();
              },error:(err)=>{
                this._sh.showSuccess();
              }
            });
  }

  submitAsCompany() {
    this.submitPerson().subscribe({
      next: (res) => {
        this.router.navigate(['/auth/company-registration']);
        this._sh.showSuccess();
      },error:(err)=>{
        this._sh.showSuccess();
      }
    });

  }

  goToLogin() {
    this.router.navigate(['/']);
  }

  show() {
    this.display=true;
  }



  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
  }
}
