import { IRegistrationAnnouncement } from './../../../core/interfaces/registration-announcement.interface';
import { ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { RegistrationAnnouncementService } from '../registration-announcement.service';

@Component({
  selector: 'app-registration-announcement-edit',
  templateUrl: './registration-announcement-edit.component.html',
  styleUrls: ['./registration-announcement-edit.component.css']
})
export class RegistrationAnnouncementEditComponent implements OnInit {

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;

  constructor(
    private _formBuilder: FormBuilder,
    private registrationAnnouncementService: RegistrationAnnouncementService,
    private route: ActivatedRoute
  ) {

    this.editForm = this._formBuilder.group({
      code: ['', [Validators.required, Validators.maxLength(36)]],
      name: ['', [Validators.required, Validators.maxLength(36)]],
      displayName: ['', [Validators.required, Validators.maxLength(24)]],
      address: ['', [Validators.required, Validators.maxLength(24)]],
      isActive: [false, [Validators.required, Validators.maxLength(24)]],
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
    let res = this.registrationAnnouncementService.getById(id).subscribe({
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
    this.editForm.setValue(entityData as IRegistrationAnnouncement[]);
  }

  submit() {

    this.disableButton = true;

    if (this.editForm.valid) {
      let rest = this.updateMode?this.registrationAnnouncementService.insert(this.editForm.value) : this.registrationAnnouncementService.update(this.editForm.value.id,this.editForm.value);
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
