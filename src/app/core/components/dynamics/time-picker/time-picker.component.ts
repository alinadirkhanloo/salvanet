import { Component, Input, Output } from '@angular/core';
import { ITimePicker } from 'app/core/interfaces/components/time-picker/time-picker.interface';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-time-picker',
  templateUrl: './time-picker.component.html',
  styleUrls: ['./time-picker.component.css'],
})
export class TimePickerComponent {

  /** Inputs */
  @Input() timePickerConfig !: ITimePicker;

  /** Outputs : change , clear button clicked , toggle button clicked */
  @Output() timeChange : EventEmitter;
  @Output() clearBtnClicked : EventEmitter;
  @Output() toggleBtnClicked : EventEmitter;


  /** Emit an event after value changed */
  timeChanged($event:any) {
    this.timeChange.emit($event);
  }

  /** Emit an event after value changed */
  clearBtnClick($event:any) {
    this.clearBtnClicked.emit($event);
  }

  /** Emit an event after value changed */
  toggleBtnClick($event:any) {
    this.toggleBtnClicked.emit($event);
  }
}
