import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDynamicTree } from 'app/core/components/dynamics/dynamic-tree/dynamic-tree.interface';
import { SelectionMode } from 'app/core/enums/dynamic-tree.enum';
import { CommonService } from 'app/core/services/common/common.service';
import { SharedService } from 'app/shared/services/shared.service';
import { TreeNode, ConfirmationService } from 'primeng/api';
import { ReplaySubject, Subscription } from 'rxjs';
import { DivisionsOfTheCountryService } from './divisions-of-the-country.service';

@Component({
  selector: 'app-divisions-of-the-country',
  templateUrl: './divisions-of-the-country.component.html',
  styleUrls: ['./divisions-of-the-country.component.css']
})
export class DivisionsOfTheCountryComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  public baseInfoTreeConfig: IDynamicTree;
  visibilityOfEditeOption = false;
  treeData:any = [];
  load=false;
  uploading=false;
  constructor(
    private dcService: DivisionsOfTheCountryService,
    private commonService: CommonService,private confirmationService: ConfirmationService,
    private router:Router, private shService:SharedService
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

          treeNodes$: this.commonService.getTree('countryDivision/countryDivisionSubDivisions'),

          onNodeContextMenuSelect: new ReplaySubject<any>(1),
          onNodeSelect: new ReplaySubject<any>(1),

          lazyUrl: [
            `countryDivision/countryDivisionSubDivisions`,
            '',
          ],
          contextMenuItems: this.getContextMenu(),

          selectionMode: SelectionMode.SINGLE_SELECT
        };
        this.subscribeEvents();
        setTimeout(() => {
          this.load=true;
        }, 500);

  }


  addNewNode(event) {
    let selectedNode = this.baseInfoTreeConfig.selectedFile;
    this.router.navigateByUrl('pages/divisions-of-the-country/new',
    {
      state:
      {
        node: selectedNode
      }
    });
  }

  editNode(event) {
    let selectedNode = this.baseInfoTreeConfig.selectedFile;
    this.router.navigateByUrl('pages/divisions-of-the-country/edit',
    { state:
      {
        node: selectedNode
      }
    });
  }

  deleteNode(event) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'کاربر گرامی، آیا قصد حذف مقدار انتخاب شده را دارید؟',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel:'بله',
      rejectLabel:'خیر',
      acceptButtonStyleClass:'mx-2',
      accept: () => {
        //confirm action
        this.subscription.add(
          this.dcService.delete((this.baseInfoTreeConfig.selectedFile as TreeNode).data).subscribe({
            next:(result)=>{
              this.shService.showSuccess('حذف شد');
            },
            error:(err)=>{
              this.shService.showSuccess('خطای سرور');
            }
          })
        );


      },
      reject: () => {
        //reject action
      }
    });

  }

  confirmUpload(event: Event) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'کاربر گرامی، آیا قصد بارگذاری اطلاعات تقسیمات کشوری را دارید ؟'    ,
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'بله',
      rejectLabel: 'خیر',
      acceptButtonStyleClass: 'mx-2',
      accept: () => {
        //confirm action
        this.uploading=true;
        this.subscription.add(
          this.dcService.create({},'ingest').subscribe({
            next:(result)=>{
              this.shService.showSuccess('بارگذاری انجام شد');
              this.uploading=false;
            },
            error:(err)=>{
              this.shService.showSuccess('خطای سرور');
              this.uploading=false;
            }
          })
        );

      },
      reject: () => {
        //reject action
      }
    });
  }

  getContextMenu() {
    return [
      {
        label: 'درج',
        icon: 'las la-plus text-info',
        command: event => this.addNewNode(event),
      },
      {
        label: 'ویرایش',
        icon: 'las la-edit text-warning',
        command: event => this.editNode(event)
      },
      {
        label: 'حذف',
        icon: 'las la-trash text-danger',
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
