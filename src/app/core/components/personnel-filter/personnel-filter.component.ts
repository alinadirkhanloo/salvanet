import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { IDropdown } from 'app/core/interfaces/dropdown/dropdonw.interface';
import { Observable } from 'rxjs';
import { IDynamicSelect, IDynamicSelectItem } from '../dynamics/dynamic-select/dynamic-select.interface';
import { PersonnelFilterService } from './personnel-filter.service';

@Component({
  selector: 'app-personnel-filter',
  templateUrl: './personnel-filter.component.html',
  styleUrls: ['./personnel-filter.component.css']
})
export class PersonnelFilterComponent implements OnInit{


  public countrySelectorConfig!: IDynamicSelect;
  public countryModel!: IDynamicSelectItem;

  public genderSelectorConfig!: IDynamicSelect;
  public genderModel!: IDynamicSelectItem;

  public religionSelectorConfig!: IDynamicSelect;
  public religionModel!: IDynamicSelectItem;

  public sectSelectorConfig!: IDynamicSelect;
  public sectModel!: IDynamicSelectItem;

  public stateSelectorConfig!: IDynamicSelect;
  public stateModel!: IDynamicSelectItem;

  public citySelectorConfig!: IDynamicSelect;
  public cityModel!: IDynamicSelectItem;

  public townshipSelectorConfig!: IDynamicSelect;
  public townshipModel!: IDynamicSelectItem;



  citizenships: IDropdown[] = [
    {key:'ایرانی',value:true},
    {key:'غیر ایرانی',value:false}
  ];
  citizenship:string;


  public filtersForm: FormGroup;


  constructor(private pfService: PersonnelFilterService,
              private fb:FormBuilder) {}

  ngOnInit(): void {
    this.filtersForm = this.fb.group(
      {
        IsInternal: [''],
        IsActive: [''],
        CountryBaseInformationId: [''],
        NationalCode: [''],
        MaxBirthDate: [''],
        MinBirthDate: [''],
        FirstName: [''],
        LastName: [''],
        GenderBaseInformationId: [''],
        ReligionBaseInformationId: [''],
        FaithBaseInformationId: [''],
        CityBaseInformationId: [''],
        CountyBaseInformationId: [''],
        ProvinceBaseInformationId: [''],
        Specialties: [''],
        CellPhone: [''],
        HomePhone: [''],
        MaxCreationDate: [''],
        MinCreationDate: ['']
      }
    )

    this.configSelectors();
  }

  getBaseInfos(id: number | string): Observable<IDynamicSelectItem[]> {
    return this.pfService.getBaseInfosById(id, 'base-information-list');
  }

  _onCountrySelectorChanged(event) {
    if (this.countrySelectorConfig !== undefined && this.countrySelectorConfig) {
      // this.configurationBaseInfos(this.firstBaseInfoHeader.id);
    }
  }

  _onGenderSelectorChanged(event) {
    if (this.genderSelectorConfig !== undefined && this.genderSelectorConfig) {
      // this.configurationBaseInfos(this.firstBaseInfoHeader.id);
    }
  }

  _onReligionSelectorChanged(event) {
    if (this.religionSelectorConfig !== undefined && this.religionSelectorConfig) {
      // this.configurationBaseInfos(this.firstBaseInfoHeader.id);
    }
  }
  _onSectSelectorChanged(event) {
    if (this.sectSelectorConfig !== undefined && this.sectSelectorConfig) {
      // this.configurationBaseInfos(this.firstBaseInfoHeader.id);
    }
  }

  _onStateSelectorChanged(event) {
    if (this.stateSelectorConfig !== undefined && this.stateSelectorConfig) {
      // this.configurationBaseInfos(this.firstBaseInfoHeader.id);
    }
  }

  _onCitySelectorChanged(event) {
    if (this.citySelectorConfig !== undefined && this.citySelectorConfig) {
      // this.configurationBaseInfos(this.firstBaseInfoHeader.id);
    }
  }

  _onTownshipSelectorChanged(event) {
    if (this.citySelectorConfig !== undefined && this.citySelectorConfig) {
      // this.configurationBaseInfos(this.firstBaseInfoHeader.id);
    }
  }


  configSelectors() {
    this.countrySelectorConfig = {
      options$: this.getBaseInfos('aa09c281ab974be49773f0807fd649ba'),
      placeholder: 'کشور',
      optionLabel: 'topic',
      showClear: true,
      filterBy: 'topic',
      selectId: 'countrySelect',
      name: 'countrySelectorConfig'
    };
    this.genderSelectorConfig = {
      options$: this.getBaseInfos('ae09c281ab974be49773f0807fd649ba'),
      placeholder: 'جنسیت',
      optionLabel: 'topic',
      optionValue: 'id',
      showClear: true,
      filterBy: 'topic',
      selectId: 'genderSelector',
      name: 'genderSelectorConfig'
    };
    this.religionSelectorConfig = {
      options$: this.getBaseInfos('b309c281ab974be49773f0807fd649ba'),
      placeholder: 'دین',
      optionLabel: 'topic',
      showClear: true,
      filterBy: 'topic',
      selectId: 'religionSelector',
      name: 'religionSelectorConfig'
    };

    this.sectSelectorConfig = {
      options$: this.getBaseInfos('b409c281ab974be49773f0807fd649ba'),
      placeholder: 'مذهب',
      optionLabel: 'topic',
      showClear: true,
      filterBy: 'topic',
      selectId: 'sectSelector',
      name: 'sectSelectorConfig'
    };
    this.stateSelectorConfig = {
      options$: this.getBaseInfos('ac09c281ab974be49773f0807fd649ba'),
      placeholder: 'استان',
      optionLabel: 'topic',
      showClear: true,
      filterBy: 'topic',
      selectId: 'sectSelector',
      name: 'sectSelectorConfig'
    };
    this.citySelectorConfig = {
      options$: this.getBaseInfos('ad09c281ab974be49773f0807fd649ba'),
      placeholder: 'شهرستان',
      optionLabel: 'topic',
      showClear: true,
      filterBy: 'topic',
      selectId: 'sectSelector',
      name: 'sectSelectorConfig'
    };

    this.townshipSelectorConfig= {
      options$: this.getBaseInfos('ab09c281ab974be49773f0807fd649ba'),
      placeholder: 'شهر',
      optionLabel: 'topic',
      showClear: true,
      filterBy: 'topic',
      selectId: 'sectSelector',
      name: 'sectSelectorConfig'
    };

  }


search(){}
}
