import { IOrganization } from './../../core/interfaces/organization.interface';
import { OrganizationService } from './organization.service';
import { Router } from '@angular/router';
import { DialogService } from 'primeng/dynamicdialog';
import { ConfirmationService, LazyLoadEvent } from 'primeng/api';
import { IGridHeader, GenericGrid } from 'app/core/interfaces/grid.interface';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { SelectionMode } from 'app/core/enums/dynamic-tree.enum';
import { ReplaySubject, Subscription } from 'rxjs';
import { IDynamicTree } from 'app/core/components/dynamics/dynamic-tree/dynamic-tree.interface';

@Component({
  selector: 'app-organization',
  templateUrl: './organization.component.html',
  styleUrls: ['./organization.component.css']
})
export class OrganizationComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  public baseInfoTreeConfig: IDynamicTree;
  visibilityOfEditeOption = false;

  constructor(
    private dcService: OrganizationService,
    private router:Router
    ) {

    }

  ngOnInit(): void {
    this.initialTree();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initialTree() {

    this.baseInfoTreeConfig = {

      treeNodes$: this.dcService.mockData$,

      onNodeContextMenuSelect: new ReplaySubject<any>(1),
      onNodeSelect: new ReplaySubject<any>(1),

      lazyUrl: [
        `api/app/base-information-header`,
        'tree',
      ],
      contextMenuItems: this.getContextMenu(),

      selectionMode: SelectionMode.SINGLE_SELECT
    };

    this.subscribeEvents();

  }

  addNewNode(event) {
    let selectedNode = this.baseInfoTreeConfig.selectedFile;
    this.router.navigateByUrl('pages/organization/new',
    { state:
      {
        node: selectedNode
      }
    });
  }
  addRigen(event) {
    let selectedNode = this.baseInfoTreeConfig.selectedFile;
    this.router.navigateByUrl('pages/organization/region/new',
    { state:
      {
        node: selectedNode
      }
    });
  }
  editNode(event) {
    let selectedNode = this.baseInfoTreeConfig.selectedFile;
    this.router.navigateByUrl('pages/organization/edit',
    { state:
      {
        node: selectedNode
      }
    });
  }

  deleteNode(event) {
    console.log(this.baseInfoTreeConfig.selectedFile);
  }

  getContextMenu() {
    return [
      {
        label: 'ایجاد منطقه',
        icon: 'flaticon-381-add-2 text-info',
        command: event => this.addRigen(event),
      },
      {
        label: 'درج',
        icon: 'flaticon-381-add-2 text-info',
        command: event => this.addNewNode(event),
      },
      {
        label: 'ویرایش',
        icon: 'flaticon-381-edit text-warning',
        command: event => this.editNode(event),
        visible: this.visibilityOfEditeOption
      },
      {
        label: 'حذف',
        icon: 'flaticon-381-trash-2 text-danger',
        command: event => this.deleteNode(event)
      }
    ]
  }

  subscribeEvents(){

    this.subscription.add(
      this.baseInfoTreeConfig.onNodeSelect.subscribe(node=>{
        // this.baseInfoTreeConfig.selectionMode = 'checkbox';
      })
    );


    this.subscription.add(
      this.baseInfoTreeConfig.onNodeContextMenuSelect.subscribe(val => {
        this.visibilityOfEditeOption = !(val.node.parent === undefined);
        this.baseInfoTreeConfig.contextMenuItems = this.getContextMenu();

      })
    );
  }


}
