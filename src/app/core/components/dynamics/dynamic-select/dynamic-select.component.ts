import {
  Component,
  forwardRef,
  Input,
  OnDestroy,
  OnInit
} from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Subscription } from 'rxjs';

import { IDynamicSelect, IDynamicSelectItem } from './dynamic-select.interface';
import { DynamicSelectService } from './dynamic-select.service';

@Component({
  selector: 'app-dynamic-select',
  templateUrl: './dynamic-select.component.html',
  styleUrls: ['./dynamic-select.component.css'],
  providers: [
    DynamicSelectService,
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => DynamicSelectComponent), // replace name as appropriate
      multi: true,
    },
  ],
})
export class DynamicSelectComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input() selectionConfig!: IDynamicSelect;

  public subscription = new Subscription();

  constructor(private dynamicSelectService: DynamicSelectService) {}

  ngOnInit(): void {
    this.loadData();
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  set dateValue(val) {
    this.selectionConfig.selectdItems = val;
  }

  get dateValue() {
    return this.selectionConfig.selectdItems;
  }

  writeValue(obj: any): void {
    this.dateValue = obj;
    this.onChange(obj);
  }
  registerOnChange(fn: any): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: any): void {}

  setDisabledState?(isDisabled: boolean): void {}

  onChange: Function = event => {};

  loadData() {
    this.subscription.add(
      this.selectionConfig.options$.subscribe({
        next: result => {
          this.selectionConfig.items = result as IDynamicSelectItem[];
        },
      })
    );
  }
}
