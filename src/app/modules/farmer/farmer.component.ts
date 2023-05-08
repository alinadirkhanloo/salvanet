import { IDynamicSelect, IDynamicSelectItem } from './../../core/components/dynamics/dynamic-select/dynamic-select.interface';
import { FindBoxComponent } from './../../core/components/find-box/find-box.component';
import { SelectionMode } from './../../core/enums/dynamic-tree.enum';
import { ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { CommonService } from './../../core/services/common/common.service';
import { FarmerService } from './../farmers/farmers.service';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { IDynamicTree } from 'app/core/components/dynamics/dynamic-tree/dynamic-tree.interface';
import { GenericClass } from 'app/core/models/genericClass.model';
import { MenuItem } from 'primeng/api';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'app-farmer',
  templateUrl: './farmer.component.html',
  styleUrls: ['./farmer.component.css']
})
export class FarmerComponent extends GenericClass implements OnInit, OnDestroy {

  items: MenuItem[];
  public disableButton = true;

  public treeConfig: IDynamicTree;

  public workPlaces: string[] = [];
  myProductConfig1 !: IDynamicSelect;
  myProductConfig2 !: IDynamicSelect;

  intrest = '';
  productModel1: IDynamicSelectItem;
  productModel2: IDynamicSelectItem;


  private divisionCountryId = 0;
  public divisionCountryTitle: string;
  ngForm: FormGroup;

  constructor(private iwService: FarmerService,
    private shService: SharedService,
    private commonService: CommonService,
    private modalService: NgbModal,private fb:FormBuilder,
    private router: Router) { super(); 
    this.ngForm = this.fb.group({
      id: null,
      submitDate:null,
      resultDate: null,
      resultId: null,
      workplaceId: null,
      employmentId: null,
      registrationResultId: null,
      farmerId: null
    });
    }

  ngOnInit() {

    this.initialSelections();
    this.items = [{
      label: 'علاقه مندی های محل کار',
      routerLink: 'interests-workplace'
    },
    {
      label: 'تجارب کشاورزی',
      routerLink: 'agricultural-experiences'
    },
    {
      label: 'علاقه مندی های کشاورزی',
      routerLink: 'agricultural-interests'
    },
    {
      label: 'تکمیل پروفایل',
      routerLink: 'confirmation'
    }
    ];

  }

  initialSelections() {
    this.myProductConfig1 = {
      options$: this.iwService.readList('', 'product'),
      selectId: 'product1',
      placeholder: '...',
      optionValue: 'id',
      filter: true,
      showClear: true,
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }
    this.myProductConfig2 = {
      options$: this.iwService.readList('', 'product'),
      selectId: 'product2',
      placeholder: '...',
      optionValue: 'id',
      filter: true,
      showClear: true,
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }
  }
  openFindBox(idControlName: string, titleControlname: string, url, title: string) {
    this.treeConfig = {

      treeNodes$: this.commonService.getTree(url),

      onNodeContextMenuSelect: new ReplaySubject<any>(1),
      onNodeSelect: new ReplaySubject<any>(1),

      lazyUrl: [
        `${url}`,
        ``,
      ],

      selectionMode: SelectionMode.SINGLE_SELECT
    };

    const modalRef = this.modalService.open(FindBoxComponent, { size: 'lg' });
    modalRef.componentInstance.treeConfig = this.treeConfig;
    modalRef.componentInstance.title = title;
    modalRef.result.then((result) => {
      // this.closeResult = `Closed with: ${result}`;
      if (result) {
        this.ngForm.controls[idControlName].setValue(result.data);
        this.ngForm.controls[titleControlname].setValue(result.label);
      }

    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    },);
  }

  submit() { }

  cancle() { }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
