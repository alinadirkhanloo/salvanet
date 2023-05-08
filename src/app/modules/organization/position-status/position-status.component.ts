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
  label='';
  positionLabel='';
  positionId=0;


  constructor( ) {

  }


  ngOnInit(): void {

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
