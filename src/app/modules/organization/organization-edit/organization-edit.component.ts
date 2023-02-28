import { IOrganization } from './../../../core/interfaces/organization.interface';
import { OrganizationService } from './../organization.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ICompany } from 'app/core/interfaces/company.interface';
import { SharedService } from 'app/shared/services/shared.service';
import { CommonService } from 'app/core/services/common/common.service';
import { IDynamicTree } from 'app/core/components/dynamics/dynamic-tree/dynamic-tree.interface';
import { ReplaySubject } from 'rxjs';
import { FindBoxComponent } from 'app/core/components/find-box/find-box.component';
import { SelectionMode } from 'app/core/enums/dynamic-tree.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-organization-edit',
  templateUrl: './organization-edit.component.html',
  styleUrls: ['./organization-edit.component.css']
})
export class OrganizationEditComponent implements OnInit {

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;

  products=[
    {name:'afa'},
    {name:'afa'},
  ]
  public treeConfig: IDynamicTree;
  constructor(
    private _formBuilder: FormBuilder, private modalService: NgbModal,
    private companyService: OrganizationService,private commonService:CommonService,
    private route: ActivatedRoute,private shService:SharedService
  ) {

    this.editForm = this._formBuilder.group({
      name: ['', [Validators.required, Validators.maxLength(36)]],
      establishmentDate: ['', [Validators.required, Validators.maxLength(36)]],
      registrationDate: ['', [Validators.required, Validators.maxLength(36)]],
      registrationNumber: ['', [Validators.required, Validators.maxLength(36)]],
      lastRegisteredCapital: ['', [Validators.required, Validators.maxLength(36)]],
      type: ['', [Validators.required, Validators.maxLength(36)]],
      id:-1
    });
  }


  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.updateMode = true;
        this.loadById(params['id']);
      }
    });
  }


  loadById(id:number|string) {
    let res = this.companyService.readById(id).subscribe({
      next:(result)=>{
        this.setDataToForm(result);
      },
      error(err) {

      },
      complete() {
        res.unsubscribe();
      },
    });
  }

  setDataToForm(entityData:any) {
    this.editForm.setValue(entityData as ICompany[]);
  }

  openFindBox(idControlName:string,titleControlname:string,url,title:string) {
    this.commonService.getTree(url).subscribe(res=>console.log(res));

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
            this.editForm.controls[idControlName].setValue(result.data);
            this.editForm.controls[titleControlname].setValue(result.label);
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

        },);
  }

  submit() {

    this.disableButton = true;

    if (this.editForm.valid) {
      let rest = !this.updateMode?this.companyService.create(this.editForm.value) : this.companyService.update(this.editForm.value.id,this.editForm.value);
      let restSub =rest.subscribe({
        next: (result) => {
          this.shService.showSuccess();
          this.disableButton = false;
        },
        error: (error) => {
          this.shService.showError();
            this.disableButton = false;
        },
        complete() {
          restSub.unsubscribe();
        }
      });
    }
  }

  cancle(){}


}
