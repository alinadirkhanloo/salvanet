
import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-signup-type-dialog',
  templateUrl: './signup-type-dialog.component.html',
  styleUrls: ['./signup-type-dialog.component.css']
})
export class SignupTypeDialogComponent {

  constructor(private activeModal:NgbActiveModal){}

  submit(flag) {
    this.activeModal.close(flag)
  }

}
