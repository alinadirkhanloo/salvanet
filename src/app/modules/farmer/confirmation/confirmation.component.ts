
import { Component, OnDestroy } from '@angular/core';
import { GenericClass } from 'app/core/models/genericClass.model';
import { SharedService } from 'app/shared/services/shared.service';
import { ConfirmationService } from './confirmation.service';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.component.html',
  styleUrls: ['./confirmation.component.css']
})
export class ConfirmationComponent extends GenericClass implements OnDestroy {

  constructor(private cs:ConfirmationService
    , private sh:SharedService){
    super()
  }

  ngOnDestroy(): void {
    this.unsubscription()
  }

  submit(){
    this.subscription = this.cs.create(this.sh.getProfile()).subscribe();
  }

}
