import { IDynamicSelect } from 'core/components/dynamics/dynamic-select/dynamic-select.interface';

import { ActivatedRoute, Router } from '@angular/router';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ICource } from 'app/core/interfaces/course.interface';
import { WatcherService } from '../watcher.service';
import { GenericClass } from 'app/core/models/genericClass.model';

@Component({
  selector: 'app-courses-edit',
  templateUrl: './courses-edit.component.html',
  styleUrls: ['./courses-edit.component.css']
})
export class CoursesEditComponent extends GenericClass implements OnInit, OnDestroy {

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;
  public typeSelectorConfig!: IDynamicSelect;
  public userSelectorConfig!: IDynamicSelect;

  records=[];

  constructor(
    private _formBuilder: FormBuilder,
    private watcherService: WatcherService,
    private route: ActivatedRoute
  ) {
    super();
    this.editForm = this._formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(36)]],
      executor: ['', [Validators.required, Validators.maxLength(36)]],
      duration : ['', [Validators.required, Validators.maxLength(36)]],
      year : ['', [Validators.required, Validators.maxLength(36)]],
      type: ['', [Validators.required, Validators.maxLength(36)]],
      degreeYear:['', [Validators.required, Validators.maxLength(36)]],
      id:-1
    });
  }
  ngOnDestroy(): void {
    this.unsubscription();
  }

  ngOnInit(): void {

    this.typeSelectorConfig = {
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

    this.userSelectorConfig = {
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


    this.routeSub = this.route.params.subscribe(params => {
      if (params['id']) {
        this.updateMode = true;
      }
    });
  }


  setDataToForm(entityData:any) {
    this.editForm.setValue(entityData as ICource[]);
  }

  submit() {

    this.disableButton = true;

    if (this.editForm.valid) {
      this.subscription = this.watcherService.create(this.editForm.value).subscribe({
        next: (result) => {
          this.disableButton = false;
        },
        error: (error) => {
            this.disableButton = false;
        }
      });
    }
  }


}
