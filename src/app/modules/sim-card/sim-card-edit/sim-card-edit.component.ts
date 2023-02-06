import { AuthService } from './../../../core/services/auth/auth.service';
import { Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component } from '@angular/core';

@Component({
  selector: 'app-sim-card-edit',
  templateUrl: './sim-card-edit.component.html',
  styleUrls: ['./sim-card-edit.component.css']
})
export class SimCardEditComponent {

  simCardEditForm: FormGroup;
  disableButton = false;

  constructor(
    private _formBuilder: FormBuilder,
    private router: Router,
    private auth: AuthService
  ) {
    this.simCardEditForm = this._formBuilder.group({
      ownerId: ['', [Validators.required, Validators.maxLength(36)]],
      operator: ['', [Validators.required, Validators.maxLength(36)]],
      phoneNumber: ['', [Validators.required, Validators.maxLength(24)]]
    });
  }


  ngOnInit(): void { }

  submit() {

    this.disableButton = true;

    if (this.simCardEditForm.valid) {
      let rest = this.auth.checkAndSendSms(this.simCardEditForm.value, this.simCardEditForm.value).subscribe({
        next: (result) => {

          if (result['userCkeck']=== true) {
            // id number and phone number is correct
            this.router.navigate(['/auth/verification']);
            rest.unsubscribe();
          } else {
            this.disableButton = false;
            return
          }
        },
        error: () => {
            this.disableButton = false;
        }
      });
    }
  }

  cancle(){}


}
