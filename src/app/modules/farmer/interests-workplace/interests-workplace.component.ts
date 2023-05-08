import { Router } from '@angular/router';
import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDynamicTree } from 'core/components/dynamics/dynamic-tree/dynamic-tree.interface';
import { SharedService } from 'app/shared/services/shared.service';
import {  ReplaySubject } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonService } from 'app/core/services/common/common.service';
import { SelectionMode } from 'app/core/enums/dynamic-tree.enum';
import { FindBoxComponent } from 'app/core/components/find-box/find-box.component';
import { GenericClass } from 'app/core/models/genericClass.model';
import { FarmerService, IFarmer } from '../farmer.service';

@Component({
  selector: 'app-interests-workplace',
  templateUrl: './interests-workplace.component.html',
  styleUrls: ['./interests-workplace.component.css']
})
export class InterestsWorkplaceComponent extends GenericClass implements OnInit,OnDestroy {

  public disableButton = true;

  public treeConfig: IDynamicTree;

  public workPlaces: string[] = [];

  private divisionCountryId = 0;
  public divisionCountryTitle: string;

  editForm: FormGroup;
  updateMode = false;
  routeSub=null;
  records =[];
  colapsed=true

  constructor(private iwService: FarmerService,
    private shService: SharedService,
    private commonService: CommonService,
    private modalService: NgbModal,
    private router:Router
  ) {
    super();
  }
  ngOnDestroy(): void {
    this.unsubscription();
  }

  ngOnInit(): void {
  }


  openFindBox(url, title: string) {
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
        this.divisionCountryId = result.data;
        this.divisionCountryTitle = result.label;

      }

    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    },);
  }

  reset() {
    this.divisionCountryId = 0;
    this.divisionCountryTitle = '';
  }

  submit() {
    this.disableButton = true;
    let temp:IFarmer = this.iwService.getFarmer();
    temp.workplaceId = this.divisionCountryId;
      this.iwService.setWorkPlace(temp);
      this.router.navigateByUrl('/pages/farmer-registration/agricultural-experiences');
  }


}
