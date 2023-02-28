import { Component, Input } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { IDynamicTree } from '../dynamic-tree/dynamic-tree.interface';

@Component({
  selector: 'app-dynamic-find-box',
  templateUrl: './dynamic-find-box.component.html',
  styleUrls: ['./dynamic-find-box.component.css']
})
export class DynamicFindBoxComponent {

  @Input()
  public treeConfigs: IDynamicTree;

  @Input()
  public title: IDynamicTree;

  constructor(public activeModal: NgbActiveModal){}


  submit(){
    this.activeModal.close(this.treeConfigs.selectedFile);
  }

  cancle() {
    this.activeModal.close(null);
  }
}
