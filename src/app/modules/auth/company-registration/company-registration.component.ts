import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from 'app/shared/services/shared.service';
import { CommonService } from 'app/core/services/common/common.service';
import { AuthService } from 'app/core/services/auth/auth.service';
import { DialogService } from 'primeng/dynamicdialog';
import { PersonnelFilterComponent } from 'app/core/components/personnel-filter/personnel-filter.component';
import { GenericClass } from 'app/core/genericClass.model';

@Component({
  selector: 'app-company-registration',
  templateUrl: './company-registration.component.html',
  styleUrls: ['./company-registration.component.css'],
})
export class CompanyRegistrationComponent extends GenericClass implements OnInit, OnDestroy {
  products = [{ id: '1', topic: 'asfaf' }];

  accountForm: FormGroup;
  disableButton = false;

  constructor(
    private _formBuilder: FormBuilder,
    private modalService: NgbModal,
    private router: Router,
    public dialogService: DialogService
  ) {
    super();
    this.accountForm = this._formBuilder.group({
      nationalCode: ['', [Validators.required]],
      representativeId: ['', [Validators.required]],
      representativeName: ['', [Validators.required]],
      cEOId: ['', [Validators.required]],
      cEOName: ['', [Validators.required]],
      name: ['', [Validators.required]],
      establishmentDate: ['', [Validators.required]],
      registrationDate: ['', [Validators.required]],
      registrationNumber: ['', [Validators.required]],
      lastRegisteredCapital: [0],
      type: [1, [Validators.required]],
    });
  }
  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    // let a = this.route.params.subscribe(params => {
    //   if (params['id']) {
    //     this.accountForm.controls['representativeId'].setValue(params['id']);
    //     this.accountForm.controls['nationalCode'].setValue(this.auth.getUsername());
    // let name = JSON.parse(this.auth.getUser().idToken).firstName;
    // this.accountForm.controls['nationalCode'].setValue(name);
    //   }
    //   a.unsubscribe();
    // });
  }

  opemPersonFilter(){
    const modalRef = this.modalService.open(PersonnelFilterComponent, { fullscreen:true });
    modalRef.result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
        console.log(result);

    }, (reason) => {
        // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    },);
  }

  goToLogin() {
    this.router.navigate(['/']);
  }
}
