import { FormGroup, FormBuilder } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IDynamicTree } from 'core/components/dynamics/dynamic-tree/dynamic-tree.interface';
import { SharedService } from 'app/shared/services/shared.service';
import { ConfirmationService } from 'primeng/api';
import { Observable, Subscription, ReplaySubject } from 'rxjs';
import { IDynamicSelect } from 'core/components/dynamics/dynamic-select/dynamic-select.interface';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { InterestsWorkplaceService } from './interests-workplace.service';
import { CommonService } from 'app/core/services/common/common.service';
import { SelectionMode } from 'app/core/enums/dynamic-tree.enum';
import { FindBoxComponent } from 'app/core/components/find-box/find-box.component';
import { GenericClass } from 'app/core/models/genericClass.model';

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

  constructor(private iwService: InterestsWorkplaceService,
    private shService: SharedService,
    private commonService: CommonService,
    private modalService: NgbModal
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
    this.subscription =
      this.iwService.create({}, `${this.shService.getProfile().id}/${this.divisionCountryId}`).subscribe({
        next: (res) => {
          this.workPlaces.push(this.divisionCountryTitle);
          this.reset();
          this.shService.showSuccess();
        },
        error: (err) => {
          this.shService.showError();
          this.disableButton = false;
        }
      });

  }


}
