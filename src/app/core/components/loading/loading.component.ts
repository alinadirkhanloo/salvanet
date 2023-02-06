import { Component, Input, OnInit } from '@angular/core';
import { NgxSpinnerService } from "ngx-spinner";
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.css']
})
export class LoadingComponent implements OnInit {
  @Input() showLoading !: BehaviorSubject<boolean>;
  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
    /** spinner starts on subscribe */
    this.showLoading.subscribe(show => {
      show=== true?this.spinner.show(): this.spinner.hide();
    })
  }

}
