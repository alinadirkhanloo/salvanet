import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IDynamicSelect } from 'core/components/dynamics/dynamic-select/dynamic-select.interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SoftwareSkillsService } from './software-skills.service';

@Component({
  selector: 'app-software-skills',
  templateUrl: './software-skills.component.html',
  styleUrls: ['./software-skills.component.css']
})
export class SoftwareSkillsComponent implements OnInit {

  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  routeSub=null;
  public SelectorConfig1!: IDynamicSelect;
  public SelectorConfig2!: IDynamicSelect;
  public SelectorConfig3!: IDynamicSelect;
  public SelectorConfig4!: IDynamicSelect;
  public SelectorConfig5!: IDynamicSelect;
  public SelectorConfig6!: IDynamicSelect;


  constructor(
    private courseService: SoftwareSkillsService,
    private _formBuilder: FormBuilder,
    private route: ActivatedRoute, private router:Router
  ) {

    this.editForm = this._formBuilder.group({
      Selector1: ['', [Validators.required, Validators.maxLength(36)]],
      Selector2: ['', [Validators.required, Validators.maxLength(36)]],
      Selector3 : ['', [Validators.required, Validators.maxLength(36)]],
      Selector4 : ['', [Validators.required, Validators.maxLength(36)]],
      Selector5 : ['', [Validators.required, Validators.maxLength(36)]],
      Selector6: ['', [Validators.required, Validators.maxLength(36)]],
      id:-1
    });
  }

  ngOnInit(): void {

    this.SelectorConfig1 = {
      options$: this.courseService.readList(),
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
      options$: this.courseService.readList(),
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
      options$: this.courseService.readList(),
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
      options$: this.courseService.readList(),
      optionLabel: 'title',
      filterBy: 'title',
      placeholder: '...',
      emptyFilterMessage:'موردی یافت نشد',
      emptyMessage:'موردی یافت نشد',
      showClear: true,
      filter: true,
      selectdItems: []
    };

    this.SelectorConfig5 = {
      options$: this.courseService.readList(),
      optionLabel: 'title',
      filterBy: 'title',
      placeholder: '...',
      emptyFilterMessage:'موردی یافت نشد',
      emptyMessage:'موردی یافت نشد',
      showClear: true,
      filter: true,
      selectdItems: []
    };

    this.SelectorConfig6 = {
      options$: this.courseService.readList(),
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


  loadById(id:number|string) {
    let res = this.courseService.readById(id).subscribe({
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
    this.editForm.setValue(entityData);
  }

  submit() {

    this.disableButton = true;

    if (this.editForm.valid) {
      let rest = !this.updateMode?this.courseService.create(this.editForm.value) : this.courseService.update(this.editForm.value.id,this.editForm.value);
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

  cancle(){
    this.router.navigate(['pages/']);
  }


}
