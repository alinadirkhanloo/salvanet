import { StudyFiledFormComponent } from './study-filed-form/study-filed-form.component';
import { MajorStudyFiledFormComponent } from './major-study-filed-form/major-study-filed-form.component';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IDynamicTree } from 'app/core/components/dynamics/dynamic-tree/dynamic-tree.interface';
import { SelectionMode } from 'app/core/enums/dynamic-tree.enum';
import { CommonService } from 'app/core/services/common/common.service';
import { SharedService } from 'app/shared/services/shared.service';
import { TreeNode, ConfirmationService } from 'primeng/api';
import { ReplaySubject, Subscription } from 'rxjs';
import { StudyFiledService } from './study-filed.service';



@Component({
  selector: 'app-study-filed',
  templateUrl: './study-filed.component.html',
  styleUrls: ['./study-filed.component.css']
})
export class StudyFiledComponent implements OnInit, OnDestroy {

  private subscription = new Subscription();
  public SFTreeConfig: IDynamicTree;
  visibilityOfEditeOption = false;
  treeData: any = [];
  load = false;

  constructor(
    private sfService: StudyFiledService,
    private commonService: CommonService, private confirmationService: ConfirmationService,
    private modalService: NgbModal,
    private shService: SharedService
  ) {

  }

  ngOnInit(): void {
    this.initialTree();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  initialTree() {
    this.load = false;
    this.SFTreeConfig = {

      treeNodes$: this.commonService.getTree('studyField'),

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
      this.load = true;
    }, 500);

  }

  newStudyFiled() {
    let modalRef = this.modalService.open(StudyFiledFormComponent,{size:'lg'});
    modalRef.componentInstance.updateMode = false;

    modalRef.result?.then(result => {
      if (result) {
        this.initialTree();
      }
    }).catch(a => { })
  }


  addNewNode(event) {
    let selectedNode = this.SFTreeConfig.selectedFile as TreeNode;
    let modalRef = this.modalService.open(MajorStudyFiledFormComponent,{size:'lg'});
    modalRef.componentInstance.updateMode = false;
    modalRef.componentInstance.node = selectedNode;
    modalRef.result?.then(result => {
      if (result) {
        this.initialTree();
      }
    }).catch(a => { })
  }


  openEditForm(event) {
    let selectedNode = this.SFTreeConfig.selectedFile as TreeNode;
    if (selectedNode.parent) {
      let modalRef = this.modalService.open(MajorStudyFiledFormComponent,{size:'lg'});
      modalRef.componentInstance.updateMode = true;
      modalRef.componentInstance.node = selectedNode;
    } else {
      let modalRef = this.modalService.open(StudyFiledFormComponent,{size:'lg'});
      modalRef.componentInstance.updateMode = true;
      modalRef.componentInstance.node = selectedNode;
    }
  }


  // addNewNode(event) {
  //   let selectedNode = this.SFTreeConfig.selectedFile;
  //   this.router.navigateByUrl('pages/divisions-of-the-country/new',
  //   { 
  //     state:
  //     {
  //       node: selectedNode
  //     }
  //   });
  // }

  // editNode(event) {
  //   let selectedNode = this.SFTreeConfig.selectedFile;
  //   this.router.navigateByUrl('pages/divisions-of-the-country/edit',
  //   { state:
  //     {
  //       node: selectedNode
  //     }
  //   });
  // }

  deleteNode(event) {

    this.confirmationService.confirm({
      target: event.target,
      message: 'کاربر گرامی، آیا قصد حذف مقدار انتخاب شده را دارید؟',
      icon: 'pi pi-exclamation-triangle',
      acceptLabel: 'بله',
      rejectLabel: 'خیر',
      acceptButtonStyleClass: 'mx-2',
      accept: () => {
        //confirm action
        let selectedNode = this.SFTreeConfig.selectedFile as TreeNode;
        if (selectedNode.parent) {
          this.subscription.add(
            this.sfService.deleteMajor((this.SFTreeConfig.selectedFile as TreeNode).data).subscribe({
              next: (result) => {
                this.initialTree();
                this.shService.showSuccess('حذف شد');
              },
              error: (err) => {
                this.shService.showSuccess('خطای سرور');
              }
            })
          );
        } else {
          this.subscription.add(
            this.sfService.delete((this.SFTreeConfig.selectedFile as TreeNode).data).subscribe({
              next: (result) => {
                this.shService.showSuccess('حذف شد');
                this.initialTree();
              },
              error: (err) => {
                this.shService.showSuccess('خطای سرور');
              }
            })
          );
        }



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
        icon: 'flaticon-381-add-2 text-info',
        command: event => this.addNewNode(event),
      },
      {
        label: 'ویرایش',
        icon: 'flaticon-381-edit text-warning',
        command: event => this.openEditForm(event)
      },
      {
        label: 'حذف',
        icon: 'flaticon-381-trash-2 text-danger',
        command: event => this.deleteNode(event)
      }
    ]
  }

  subscribeEvents() {

    this.subscription.add(
      this.SFTreeConfig.onNodeSelect.subscribe(node => {
        // this.SFTreeConfig.selectionMode = 'checkbox';
      })
    );


    this.subscription.add(
      this.SFTreeConfig.onNodeContextMenuSelect.subscribe(val => {
        this.visibilityOfEditeOption = !(val.node.parent === undefined);
        this.SFTreeConfig.contextMenuItems = this.getContextMenu();

      })
    );
  }


}
