import { FormGroup, FormBuilder } from '@angular/forms';
import { FindBoxComponent } from 'app/core/components/find-box/find-box.component';
import { SelectionMode } from 'app/core/enums/dynamic-tree.enum';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Subscription, ReplaySubject } from 'rxjs';
import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { IDynamicTree } from 'app/core/components/dynamics/dynamic-tree/dynamic-tree.interface';
import { SharedService } from 'app/shared/services/shared.service';
import { CommonService } from 'app/core/services/common/common.service';
import { AuthService } from 'app/core/services/auth/auth.service';
import { DialogService } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-region-form',
  templateUrl: './region-form.component.html',
  styleUrls: ['./region-form.component.css']
})
export class RegionFormComponent {
  products=[
  ]

  landId=0;
  landTitle='';
  private sub = new Subscription();
  disableButton = false;
  disableActiveationButton = false;
  showDivisions = false;
  regId=0;
  formGroup:FormGroup;
  public treeConfig: IDynamicTree;
  constructor(private fb:FormBuilder,
    private modalService: NgbModal, private _sh: SharedService,
    private router: Router, private commonService: CommonService,
    public dialogService: DialogService, private auth: AuthService
  ){
    this.formGroup = this.fb.group({
      name:[],
      code:[]
    });
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

        this.products.push({label:result.label,id:result.data});
      }

    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    },);
  }

  submit(){
    this._sh.setCountryRegion(this.formGroup.value).subscribe(res=>{
      this._sh.showSuccess();
      this.regId = res.id;
      this.showDivisions=true
    });
  }

  cancle(){
    this.router.navigate(['/pages/organization']);
  }
}
