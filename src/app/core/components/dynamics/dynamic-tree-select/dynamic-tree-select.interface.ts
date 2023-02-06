import { Observable, ReplaySubject } from 'rxjs';
import { TreeNode } from 'primeng/api';
import { SelectionMode } from 'core/enums/dynamic-tree.enum';

export interface IDynamicTreeSelect
  {
    treeNodes$: Observable<TreeNode[]>;
    treeType?: ILazyMode | IStaticMode;
    // lazyUrl: string | [string,string];
    onShow?: ReplaySubject<any>;
    onHide?: ReplaySubject<any>;
    onFilter?: ReplaySubject<any>;
    onNodeSelect?: ReplaySubject<any>;
    onNodeUnselect?: ReplaySubject<any>;
    onNodeExpand?: ReplaySubject<any>;
    onNodeCollapse?: ReplaySubject<any>;
    onClear?: ReplaySubject<any>;
    placeholder?:	string;
    selectionMode?: Exclude<SelectionMode, SelectionMode.NON_SELECT>;
    emptyMessage?:	string;
    filter?:	boolean;
    filterBy?:	string;
    filterMode?:	string;
    filterPlaceholder?:	string;
    resetFilterOnHide?:	boolean;
    filterInputAutoFocus?: boolean;
    showClear?:		false;
    // TODO => Implementation Features below
    // scrollHeight?: string;
    // tabindex?:	string;
    // ariaLabelledBy?:	string;
    // filterLocale?:	string;
    // inputId?:	string
    // panelClass?:	string;
    // appendTo:	string;
    // display?:	 'comma' | 'chip';
  }

export interface ILazyMode {
  lazyMode: true;
  lazyUrl:  string | [string,string];
}

export interface IStaticMode {
  lazyMode: false;
}
