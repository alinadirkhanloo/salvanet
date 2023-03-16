import { WatcherService } from './../watcher.service';
import { Component, OnDestroy } from '@angular/core';
import { GenericClass } from 'app/core/models/genericClass.model';
import { SharedService } from 'app/shared/services/shared.service';

@Component({
  selector: 'app-confermation',
  templateUrl: './confermation.component.html',
  styleUrls: ['./confermation.component.css']
})
export class ConfermationComponent extends GenericClass implements OnDestroy {

  constructor(private cs:WatcherService
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
