import { ReplaySubject } from 'rxjs';

export interface IDynamicPickList
{
  sourceList: unknown[];
  targetList: unknown[];

  template?: IDefaultTemplate | ICustomTemplate;


  sourceHeader?: string,
  targetHeader?: string,
  filterBy?: string,
  filterMatchMode?: 'contains' | 'startsWith'| 'endsWith'| 'equals'| 'notEquals'| 'in'| 'lt'| 'lte'| 'gt' | 'gte',
  trackBy?: Function,
  sourceTrackBy?: Function,
  targetTrackBy?: Function,
  showSourceFilter?: boolean,
  showTargetFilter?: boolean,
  dragdrop?: boolean,
  style?: string,
  styleClass?: string,
  sourceStyle?: string,
  targetStyle?: string,
  responsive?: boolean,
  showSourceControls?: boolean,
  showTargetControls?: boolean,
  metaKeySelection?: boolean,
  sourceFilterPlaceholder?: string,
  targetFilterPlaceholder?: string,
  disabled?: boolean,
  keepSelection?: boolean,
  ariaSourceFilterLabel?: string,
  ariaTargetFilterLabel?: string,
  rightButtonAriaLabel?: string,
  leftButtonAriaLabel?: string,
  allRightButtonAriaLabel?: string,
  allLeftButtonAriaLabel?: string,
  upButtonAriaLabel?: string,
  downButtonAriaLabel?: string,
  topButtonAriaLabel?: string,
  bottomButtonAriaLabel?: string,
  stripedRows?: boolean,
  // TODO : implement below props
  // filterLocale?: string,
  //events
  onMoveToTarget?: ReplaySubject<unknown>
  onMoveToSource?: ReplaySubject<unknown>
  onMoveAllToTarget?: ReplaySubject<unknown>
  onMoveAllToSource?: ReplaySubject<unknown>
  onSourceReorder?: ReplaySubject<unknown>
  onTargetReorder?: ReplaySubject<unknown>
  onSourceSelect?: ReplaySubject<unknown>
  onTargetSelect?: ReplaySubject<unknown>
  onSourceFilter?: ReplaySubject<unknown>
  onTargetFilter?: ReplaySubject<unknown>
}

export interface IDefaultTemplate
{
  useCustom: false;
  objectKey: string;
}
export interface ICustomTemplate
{
  useCustom: true;
}
