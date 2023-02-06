import { DynamicDialogRef, DialogService } from 'primeng/dynamicdialog';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { SignupTypeDialogComponent } from '../signup-type-dialog/signup-type-dialog.component';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
  accountForm: FormGroup;
  disableButton = false;
  disableActiveationButton = false;
  ref: DynamicDialogRef;
  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    public dialogService: DialogService
  ) {
    this.accountForm = this._formBuilder.group({
      nationalId: ['', [Validators.required]],
      fName: ['', [Validators.required]],
      lName: ['', [Validators.required]],
      idNumber: ['', [Validators.required]],
      gender: ['', [Validators.required]],
      birthDate: ['', [Validators.required]],
      birthLocation: ['', [Validators.required]],
      idNumberLocation: ['', [Validators.required]],
      nationality: ['', [Validators.required]],
      country: ['', [Validators.required]],
      religen: ['', [Validators.required]],
      sect: ['', [Validators.required]],
      military: ['', [Validators.required]],
      marrid: ['', [Validators.required]],
      childNum: ['', [Validators.required]],
      job: ['', [Validators.required]],
      edu: ['', [Validators.required]],
      levelOfEdu: ['', [Validators.required]],
      home: ['', [Validators.required]],
      address: ['', [Validators.required]],
    });
  }

  submit(){
    this.show()
  }

  goToLogin(){
    this.router.navigate(['/']);
  }

  show() {
    this.ref = this.dialogService.open(SignupTypeDialogComponent, {
        header: 'ثبت نام به عنوان ...',
        width: '25%',
        contentStyle: {"overflow": "auto"},
        baseZIndex: 10000,
        maximizable: false
    });

    this.ref.onClose.subscribe((result: {legal:boolean}) => {
        if (result) {
            // this.messageService.add({severity:'info', summary: 'Product Selected', detail: product.name});
            console.log(result);
            
        }
    });

    this.ref.onMaximize.subscribe((value: any) => {
      console.log(value);
      
        // this.messageService.add({severity: 'info', summary: 'Maximized', detail:  `maximized: ${value.maximized}`});
});
}

ngOnDestroy() {
    if (this.ref) {
        this.ref.close();
    }
}
}