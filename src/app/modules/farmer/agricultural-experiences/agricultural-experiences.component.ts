import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SharedService } from 'app/shared/services/shared.service';
import { Observable, ReplaySubject } from 'rxjs';
import { IDynamicSelect, IDynamicSelectItem } from 'core/components/dynamics/dynamic-select/dynamic-select.interface';
import { AgriculturalExperiencesService } from './agricultural-experiences.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GenericClass } from 'app/core/models/genericClass.model';
import { CommonService } from 'app/core/services/common/common.service';
import { IDynamicTree } from 'app/core/components/dynamics/dynamic-tree/dynamic-tree.interface';
import { FindBoxComponent } from 'app/core/components/find-box/find-box.component';
import { SelectionMode } from 'app/core/enums/dynamic-tree.enum';

@Component({
  selector: 'app-agricultural-experiences',
  templateUrl: './agricultural-experiences.component.html',
  styleUrls: ['./agricultural-experiences.component.css']
})
export class AgriculturalExperiencesComponent extends GenericClass implements OnInit,OnDestroy {
  disableButton = true;
  formGroup:FormGroup;
  myProductConfig !: IDynamicSelect;
  caltivarConfig !: IDynamicSelect;
  public treeConfig: IDynamicTree;
  experiences = []

  constructor(
    private aeService:AgriculturalExperiencesService,
    private _fb:FormBuilder,
    private commonService: CommonService,
    private modalService: NgbModal,
    private shService: SharedService) { 
      super();
      this.formGroup =  this._fb.group(
        {
          divisionCountryId:[-1,[Validators.required]],
          divisionCountryTitle:['',[Validators.required]],
          productTitle:[-1,[Validators.required]],
          productId:['',[Validators.required]],
          caltivarTitle:['',[Validators.required]],
          caltivarId:[-1,[Validators.required]]
        }
      );
    }
  ngOnDestroy(): void {
    this.unsubscription();
  }

  ngOnInit(): void {
    this.initialSelections();
    // this.loadData();
  }

  // loadData(){
  //   this.subscription.add(this.aeService.readList().subscribe({
  //     next:(result)=>{
  //       this.experiences = result;
  //     },
  //     error:(err)=>{

  //     }
  //   })
  //   )
  // }

  initialSelections() {

    
    this.caltivarConfig = {
      options$: this.aeService.readList('caltivar'),
      selectId: 'caltivarSelector',
      placeholder: '...',
      optionValue:'id',
      filter: true,
      showClear:true,
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }

    this.myProductConfig = {
      options$: this.aeService.readList('product'),
      selectId: 'caltivarSelector',
      placeholder: '...',
      optionValue:'id',
      filter: true,
      showClear:true,
      emptyFilterMessage: 'موردی یافت نشد',
      emptyMessage: 'موردی یافت نشد'
    }

  }


  getList(res:Observable<any>,selectConfig:IDynamicSelect){
    this.subscription.add(
      res.subscribe(result=>{
        selectConfig.items=result;
      })
    )

  }
  

  openFindBox(idControlName:string,titleControlname:string,url, title: string) {
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
        this.formGroup.controls[idControlName].setValue(result.data);
      this.formGroup.controls[titleControlname].setValue(result.label);
      }

    }, (reason) => {
      // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;

    },);
  }


  reset(){
    this.formGroup.reset();
  }

  submit(){
    this.disableButton = true;
    this.subscription =
      this.aeService.create({}, `${this.shService.getProfile().id}/${this.formGroup.value.divisionCountryId}`).subscribe({
        next: (res) => {
          this.experiences.push({address:this.formGroup.value.divisionCountryTitle,product:this.formGroup.value.productTitle});
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
