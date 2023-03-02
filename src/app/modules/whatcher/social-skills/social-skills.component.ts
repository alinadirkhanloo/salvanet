import { Component, OnInit, OnDestroy } from '@angular/core';
import { IDynamicSelect } from 'core/components/dynamics/dynamic-select/dynamic-select.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericClass } from 'app/core/models/genericClass.model';
import { WatcherService } from '../watcher.service';

@Component({
  selector: 'app-social-skills',
  templateUrl: './social-skills.component.html',
  styleUrls: ['./social-skills.component.css']
})
export class SocialSkillsComponent extends GenericClass implements OnInit,OnDestroy {

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;
  public SelectorConfig1!: IDynamicSelect;
  public SelectorConfig2!: IDynamicSelect;
  public SelectorConfig3!: IDynamicSelect;
  public SelectorConfig4!: IDynamicSelect;

  records=[];

  constructor(
    private whatcherService: WatcherService,
    private _formBuilder: FormBuilder
  ) {
    super();
    this.editForm = this._formBuilder.group({
      Selector1: ['', [Validators.required, Validators.maxLength(36)]],
      Selector2: ['', [Validators.required, Validators.maxLength(36)]],
      Selector3 : ['', [Validators.required, Validators.maxLength(36)]],
      Selector4 : ['', [Validators.required, Validators.maxLength(36)]],
      id:-1
    });
  }

  ngOnDestroy(): void {
    this.unsubscription();
  }

  ngOnInit(): void {

    this.SelectorConfig1 = {
      options$: this.whatcherService.readList(),
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
      options$: this.whatcherService.readList(),
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
      options$: this.whatcherService.readList(),
      optionLabel: 'title',
      filterBy: 'title',
      placeholder: '...',
      emptyFilterMessage:'موردی یافت نشد',
      emptyMessage:'موردی یافت نشد',
      showClear: true,
      filter: true,
      selectdItems: []
    };


    this.SelectorConfig4 = {
      options$: this.whatcherService.readList(),
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
    this.editForm.setValue(entityData);
  }

  submit() {

    this.disableButton = true;

    if (this.editForm.valid) {
      this.subscription=this.whatcherService.create(this.editForm.value).subscribe({
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
