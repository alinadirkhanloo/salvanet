import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { IProductionUnit } from 'app/core/interfaces/product-unit.interface';
import { RoleService } from '../role/role.service';

@Component({
  selector: 'app-political-structure',
  templateUrl: './political-structure.component.html',
  styleUrls: ['./political-structure.component.css']
})
export class PoliticalStructureComponent implements OnInit {

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;

  constructor(
    private _formBuilder: FormBuilder,
    private roleService: RoleService,
    private route: ActivatedRoute
  ) {


  }

  ngOnInit(): void {
    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.updateMode = true;
        this.loadById(params['id']);
      }
    });
  }

  pickFile($event: any) {
    const file: File = $event.target.files[0];

    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      // const upload$ = this.accApi.UploadFile(formData);
      // upload$.subscribe(result => {
      //   if (result) {
      //     //   let licenseImage =  `${environment.baseUrl}/core/file/files/${result.url}`;
      //     // this.attorneyForm.controls['licenseImageUrl'].setValue(licenseImage);
      //     this.attorneyForm.controls['licenseImageUrl'].setValue(result.url);

      //     this.licenseUploadText = 'یک فایل بارگذاری شده است';
      //   }
      // });
    }
  }


  loadById(id:number|string) {
    let res = this.roleService.getById(id).subscribe({
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
    this.editForm.setValue(entityData as IProductionUnit[]);
  }

  submit() {

    this.disableButton = true;

    if (this.editForm.valid) {
      let rest = this.updateMode?this.roleService.insert(this.editForm.value) : this.roleService.update(this.editForm.value.id,this.editForm.value);
      let restSub =rest.subscribe({
        next: (result) => {
          this.disableButton = false;
        },
        error: (error) => {
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

