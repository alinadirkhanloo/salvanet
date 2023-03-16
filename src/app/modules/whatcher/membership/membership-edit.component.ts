import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { IDynamicSelect } from 'core/components/dynamics/dynamic-select/dynamic-select.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericClass } from 'app/core/models/genericClass.model';
import { WatcherService } from '../watcher.service';
import { IMembership } from './membership.interface';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'app-membership-edit',
  templateUrl: './membership-edit.component.html',
  styleUrls: ['./membership-edit.component.css']
})
export class MembershipEditComponent extends GenericClass implements OnInit, OnDestroy {

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;
  public SelectorConfig1!: IDynamicSelect;
  public SelectorConfig2!: IDynamicSelect;
  public SelectorConfig3!: IDynamicSelect;
  public SelectorConfig4!: IDynamicSelect;
  public records = [];
  colapsed=true;
  constructor(
    private watcherService: WatcherService,private sharedSeravice:SharedService,
    private _formBuilder: FormBuilder
  ) {
    super();
    this.editForm = this._formBuilder.group({
      Selector1: ['', [Validators.required, Validators.maxLength(36)]],
      Selector2: ['', [Validators.required, Validators.maxLength(36)]],
      Selector3 : ['', [Validators.required, Validators.maxLength(36)]],
      name : ['', [Validators.required, Validators.maxLength(36)]],
      id:-1
    });
  }

  ngOnDestroy(): void {
    this.unsubscription();
  }

  ngOnInit(): void {

    this.SelectorConfig1 = {
      options$: this.watcherService.readList(),
      optionLabel: 'title',
      filterBy: 'title',
      placeholder: '...',
      emptyFilterMessage:'موردی یافت نشد',
      emptyMessage:'موردی یافت نشد',
      showClear: true,
      filter: true,
      selectdItems: []
    };

    this.SelectorConfig2 = {
      options$: this.watcherService.readList(),
      optionLabel: 'title',
      filterBy: 'title',
      placeholder: '...',
      emptyFilterMessage:'موردی یافت نشد',
      emptyMessage:'موردی یافت نشد',
      showClear: true,
      filter: true,
      selectdItems: []
    };

    this.SelectorConfig3 = {
      options$: this.watcherService.readList(),
      optionLabel: 'title',
      filterBy: 'title',
      placeholder: '...',
      emptyFilterMessage:'موردی یافت نشد',
      emptyMessage:'موردی یافت نشد',
      showClear: true,
      filter: true,
      selectdItems: []
    };


  }


  setDataToForm(entityData:any) {
    this.editForm.setValue(entityData as IMembership[]);
  }

  submit() {

    this.disableButton = true;

    if (this.editForm.valid) {
      this.subscription = this.watcherService.create(this.editForm.value).subscribe({
        next: (result) => {
          this.sharedSeravice.showSuccess();
          this.disableButton = false;
        },
        error: (error) => {
            this.disableButton = false;
        }
      });
    }
  }


}
