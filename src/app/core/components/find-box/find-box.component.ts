import { IDynamicTree } from 'app/core/components/dynamics/dynamic-tree/dynamic-tree.interface';
import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-find-box',
  templateUrl: './find-box.component.html',
  styleUrls: ['./find-box.component.css']
})
export class FindBoxComponent implements OnInit {
  @Input()
  treeConfig!:IDynamicTree;
  @Input()
  title!:string;
  constructor(public activeModal:NgbActiveModal) {
  }
  ngOnInit(): void {
  }


  submit(){
    this.activeModal.close(this.treeConfig.selectedFile);
  }

  close(){
    this.activeModal.close(null);
  }

  get disableButton():boolean{
    return !!this.treeConfig?.selectedFile;
  }
}
