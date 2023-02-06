import { OrganizationService } from './../organization.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-position-status',
  templateUrl: './position-status.component.html',
  styleUrls: ['./position-status.component.css']
})
export class PositionStatusComponent implements OnInit {

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;

  products=[
    {name:'afa'},
    {name:'afa'},
  ]

  constructor(
    private _formBuilder: FormBuilder,
    private companyService: OrganizationService,
    private route: ActivatedRoute
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
    // let res = this.companyService.getById(id).subscribe({
    //   next:(result)=>{
    //     this.setDataToForm(result);
    //   },
    //   error(err) {

    //   },
    //   complete() {
    //     res.unsubscribe();
    //   },
    // });
  }

  setDataToForm(entityData:any) {
    // this.editForm.setValue(entityData as ICompany[]);
  }

  submit() {

    this.disableButton = true;

    if (this.editForm.valid) {
      // let rest = this.updateMode?this.companyService.insert(this.editForm.value) : this.companyService.update(this.editForm.value.id,this.editForm.value);
      // let restSub =rest.subscribe({
      //   next: (result) => {
      //     this.disableButton = false;
      //   },
      //   error: (error) => {
      //       this.disableButton = false;
      //   },
      //   complete() {
      //     restSub.unsubscribe();
      //   }
      // });
    }
  }

  cancle(){}


}
