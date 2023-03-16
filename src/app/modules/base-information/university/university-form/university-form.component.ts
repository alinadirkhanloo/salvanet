import { FindBoxComponent } from 'app/core/components/find-box/find-box.component';
import { SelectionMode } from 'app/core/enums/dynamic-tree.enum';
import { Router } from '@angular/router';
import { IUniversity } from './../university.interface';
import { UniversityService } from './../university.service';
import { ReplaySubject, Subscription } from 'rxjs';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SharedService } from 'app/shared/services/shared.service';
import { IDynamicTree } from 'app/core/components/dynamics/dynamic-tree/dynamic-tree.interface';
import { CommonService } from 'app/core/services/common/common.service';

@Component({
  selector: 'app-university-form',
  templateUrl: './university-form.component.html',
  styleUrls: ['./university-form.component.css']
})
export class UniversityFormComponent  implements OnInit, OnDestroy{

  editForm:FormGroup;
  disableButton = false;
  private sub = new Subscription();
  public treeConfig: IDynamicTree;
  @Input()
  updateMode = false;

  @Input()
  product!:IUniversity;

  constructor(
    private activeModal:NgbActiveModal,
    private _fb:FormBuilder,
    private univService:UniversityService,
    private shService:SharedService,
    private modalService: NgbModal,
    private router: Router,private commonService:CommonService
    ){
      this.editForm = this._fb.group({
        id:-1,
        name:['',[Validators.required,Validators.maxLength(32),Validators.minLength(2)]],
        locatedInId:['',[Validators.required]],
        locatedInLabel:['',[Validators.required]],
      })
  }
  ngOnDestroy(): void {
   this.sub.unsubscribe();
  }
  ngOnInit(): void {
    if (this.updateMode) {
      this.editForm.setValue(this.product);
    }
  }

  openFindBox(idControlName:string,titleControlname:string,url,title:string) {
    this.commonService.getTree(url).subscribe(res=>console.log(res));

    this.treeConfig = {

          treeNodes$: this.commonService.getTree(url),

          onNodeContextMenuSelect: new ReplaySubject<any>(1),
          onNodeSelect: new ReplaySubject<any>(1),

          lazyUrl: [
            `${url}`,
            '',
          ],

          selectionMode: SelectionMode.SINGLE_SELECT
        };

        const modalRef = this.modalService.open(FindBoxComponent, { size: 'lg' });
        modalRef.componentInstance.treeConfig = this.treeConfig;
        modalRef.componentInstance.title = title;
        modalRef.result.then((result) => {
          // this.closeResult = `Closed with: ${result}`;
            if (result) {
              this.editForm.controls[idControlName].setValue(result.data);
            this.editForm.controls[titleControlname].setValue(result.label);
            }
        }, (reason) => {
            // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        },);
  }

  submit(){
    this.disableButton = true;
    if (this.updateMode) {
      this.sub.add(
        this.univService.update(this.editForm.value).subscribe({
          next:(res)=>{
            this.shService.showSuccess();
            this.activeModal.close(true);
          },
          error:(err)=>{
            this.disableButton = false;
            this.shService.showError();
          }
        })
        );
    } else {
      this.sub.add(
        this.univService.create(this.editForm.value).subscribe({
          next:(res)=>{
            this.shService.showSuccess();
            this.activeModal.close(true);
          },
          error:(err)=>{
            this.shService.showError();
            this.disableButton = false;
          }
        })
        );
    }
  }

  close(){this.activeModal.dismiss()}
}
