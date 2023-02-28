import { Observable, ReplaySubject } from 'rxjs';

export interface IDynamicSelect {

  options$?: Observable<IDynamicSelectItem[]>;
  optionValue?:string;
  items?: IDynamicSelectItem[];
  selectdItems?: any;
  emptyFilterMessage?: 'موردی یافت نشد',
  emptyMessage?: 'موردی یافت نشد',
  optionLabel?: string;
  filter?: boolean;
  filterBy?: string;
  placeholder?: string;
  disabled?: boolean;
  name?: string;
  style?: any;
  panelStyle?: any;
  styleClass?: string;
  panelStyleClass?: string;
  readonly?: boolean;
  required?: boolean;
  filterPlaceholder?: string;
  selectId?: string;
  autofocus?: boolean;
  resetFilterOnHide?: boolean;
  dropdownIcon?: string;
  autoDisplayFirst?: boolean;
  group?: boolean;
  showClear?: boolean;
  lazy?: boolean;
  virtualScroll?: boolean;
  virtualScrollItemSize?: number;
  filterMatchMode?: string;
  maxlength?: number;
  tooltip?: string;
  tooltipPosition?: string;
  tooltipPositionStyle?: string;
  tooltipStyleClass?: string;
  autofocusFilter?: boolean;

  onClick?: ReplaySubject<unknown>;
  onChange?: ReplaySubject<unknown>;
  onFilter?: ReplaySubject<unknown>;
  onFocus?: ReplaySubject<unknown>;
  onBlur?: ReplaySubject<unknown>;
  onShow?: ReplaySubject<unknown>;
  onHide?: ReplaySubject<unknown>;
  onClear?: ReplaySubject<unknown>;
  onLazyLoad?: ReplaySubject<unknown>;
}

export interface IDynamicSelectItem {
  title: string;
  id: string | number;
}
