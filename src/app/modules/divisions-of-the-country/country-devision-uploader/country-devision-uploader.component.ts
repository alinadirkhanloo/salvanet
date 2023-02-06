import { DivisionsOfTheCountryService } from './../divisions-of-the-country.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ICountryDivision } from 'app/core/interfaces/country.interface';

@Component({
  selector: 'app-country-devision-uploader',
  templateUrl: './country-devision-uploader.component.html',
  styleUrls: ['./country-devision-uploader.component.css']
})
export class CountryDevisionUploaderComponent {

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;

  constructor(
    private _formBuilder: FormBuilder,
    private dcService: DivisionsOfTheCountryService,
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
    // let res = this.dcService.getById(id).subscribe({
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
    this.editForm.setValue(entityData as ICountryDivision[]);
  }

  submit() {

    // this.disableButton = true;

    // if (this.editForm.valid) {
    //   let rest = this.updateMode?this.dcService.insert(this.editForm.value) : this.dcService.update(this.editForm.value.id,this.editForm.value);
    //   let restSub =rest.subscribe({
    //     next: (result) => {
    //       this.disableButton = false;
    //     },
    //     error: (error) => {
    //         this.disableButton = false;
    //     },
    //     complete() {
    //       restSub.unsubscribe();
    //     }
    //   });
    // }
  }

  cancle(){}


}
