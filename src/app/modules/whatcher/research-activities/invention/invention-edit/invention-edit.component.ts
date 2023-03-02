import { IInvention } from 'core/interfaces/invention.interface';
import { InventionService } from './../invention.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'app-invention-edit',
  templateUrl: './invention-edit.component.html',
  styleUrls: ['./invention-edit.component.css']
})
export class InventionEditComponent implements OnInit {

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub = null;

  records = [];

  constructor(
    private _formBuilder: FormBuilder,
    private inventionService: InventionService,
    private route: ActivatedRoute,
    private router: Router, private shService: SharedService
  ) {

    this.editForm = this._formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(36)]],
      registrationNumber: ['', [Validators.required, Validators.maxLength(36)]],
      id: -1
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


  loadById(id: number | string) {
    let res = this.inventionService.readById(id).subscribe({
      next: (result) => {
        this.setDataToForm(result);
      },
      error(err) {

      },
      complete() {
        res.unsubscribe();
      },
    });
  }

  setDataToForm(entityData: any) {
    this.editForm.setValue(entityData as IInvention[]);
  }

  submit() {

    this.disableButton = true;

    if (this.editForm.valid) {
      let rest = this.updateMode ? this.inventionService.update(this.editForm.value.id, this.editForm.value) : this.inventionService.create(this.editForm.value);
      let restSub = rest.subscribe({
        next: (result) => {
          this.shService.showSuccess()
          this.disableButton = false;
          this.router.navigate(['pages/case-history/research-activities/invention']);
        },
        error: (error) => {
          this.shService.showError()
          this.disableButton = false;
        },
        complete() {
          restSub.unsubscribe();
        }
      });
    }
  }

  cancle() {
    this.router.navigate(['pages/case-history/research-activities/invention']);
  }


}
