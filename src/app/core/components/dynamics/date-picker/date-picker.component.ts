import { Component, forwardRef, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DatePickerComponent), // replace name as appropriate
      multi: true,
    },
  ],
})
export class DatePickerComponent implements ControlValueAccessor {
  public date = '';
  @Input() disabled = false;
  set dateValue(val) {
    this.date = val;
  }

  get dateValue() {
    return this.date;
  }

  clear() {
    this.date = '';
  }

  writeValue(obj: any): void {
    this.dateValue = obj;
    this.onChange(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void { }

  setDisabledState?(isDisabled: boolean): void { }

  onChange: Function = event => { };
}
