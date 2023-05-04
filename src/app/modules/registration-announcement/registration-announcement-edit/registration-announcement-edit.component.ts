import { IDropdown } from 'core/interfaces/dropdown/dropdonw.interface';
import { IDynamicPickList } from 'core/components/dynamics/dynamic-pick-list/dynamic-pick-list.interface';
import { IDynamicSelect, IDynamicSelectItem } from 'core/components/dynamics/dynamic-select/dynamic-select.interface';
import { IRegistrationAnnouncement } from 'core/interfaces/registration-announcement.interface';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { RegistrationAnnouncementService } from '../registration-announcement.service';
import { Subscription } from 'rxjs';
import { MenuItem } from 'primeng/api';
import { Roles } from '../registration-announcement.interface';

@Component({
  selector: 'app-registration-announcement-edit',
  templateUrl: './registration-announcement-edit.component.html',
  styleUrls: ['./registration-announcement-edit.component.css']
})
export class RegistrationAnnouncementEditComponent implements OnInit,OnDestroy {

  private su = new Subscription();
  editForm: FormGroup;
  disableButton = false;
  updateMode = false;
  public roleSelectorConfig!: IDynamicSelect;
  public roleModel: IDynamicSelectItem;
  public pickListConfigs!: IDynamicPickList;
  stateConfig !: IDynamicSelect;
  roles: IDropdown[] = Roles;

  showForm = true;

  constructor(
    private _formBuilder: FormBuilder,
    private registrationAnnouncementService: RegistrationAnnouncementService,
    private route: ActivatedRoute, private router:Router
  ) {

    this.editForm = this._formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(36)]],
      startDate: ['', [Validators.required, Validators.maxLength(11)]],
      endDate: ['', [Validators.required, Validators.maxLength(11)]],
      rolesId: ['', [Validators.required]],
      active: [false,[]],
      description: ['', [Validators.required, Validators.maxLength(64)]],
      code: ['', [Validators.required, Validators.maxLength(8)]],
      id:-1
    });
  }
  ngOnDestroy(): void {
    this.su.unsubscribe();
  }


  ngOnInit(): void {

    this.pickListConfigs = {
      sourceHeader:'استان/شهرستان',
      targetHeader:'انتخاب شده',
      sourceList: [{id:0,topic:'تهران'}],
      targetList: [{id:0,topic:'ری'}]
    };

    this.su.add(this.route.params.subscribe(params => {
      if (params['id']) {
        this.updateMode = true;
        this.loadById(params['id']);
      }
    }));
  }


  loadById(id:number|string) {
    this.su.add(this.registrationAnnouncementService.readById(id).subscribe({
      next:(result)=>{
        this.setDataToForm(result);
      },
      error(err) {

      }
    }));
  }

  setDataToForm(entityData:any) {
    this.editForm.setValue(entityData as IRegistrationAnnouncement[]);
  }

  submit() {

    this.disableButton = true;

    if (this.editForm.valid) {
      let rest = !this.updateMode?this.registrationAnnouncementService.create(this.editForm.value) : this.registrationAnnouncementService.update(this.editForm.value.id,this.editForm.value);
      this.su.add(rest.subscribe({
        next: (result) => {
          this.disableButton = false;
          this.showForm = !this.showForm;
        },
        error: (error) => {
            this.disableButton = false;
        }
      }));
    }
  }

  cancle(){
    this.router.navigate(['pages/registration-announcement']);
  }

  submit2(){
    this.showForm = !this.showForm;
  }

}
