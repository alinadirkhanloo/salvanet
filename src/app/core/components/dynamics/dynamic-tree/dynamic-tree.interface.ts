import { ReplaySubject, Observable } from 'rxjs';
import { MenuItem, TreeNode } from 'primeng/api';
import { SelectionMode } from 'core/enums/dynamic-tree.enum';

export interface IDynamicTree
{
  treeNodes$: Observable<TreeNode[]>;
  lazyUrl: string | [string,string];
  contextMenuItems?: ICustomMenuItem[];
  selectionChange?: ReplaySubject<any>;
  onNodeSelect?: ReplaySubject<any>;
  onNodeUnselect?: ReplaySubject<any>;
  onNodeExpand?: ReplaySubject<any>;
  onNodeCollapse?: ReplaySubject<any>;
  onNodeContextMenuSelect?: ReplaySubject<any>;
  onNodeDrop?: ReplaySubject<any>;
  onLazyLoad?: ReplaySubject<any>;
  onScroll?: ReplaySubject<any>;
  onScrollIndexChange?: ReplaySubject<any>;
  onFilter?: ReplaySubject<any>;
  selectionMode?: SelectionMode;
  selectedFile?: TreeNode[];
  
  // TODO => Implementation Features below
  // style?: any;
  // styleClass?: string;
  // draggableScope?: any;
  // droppableScope?: any;
  // draggableNodes?: boolean;
  // droppableNodes?: boolean;
  // loadingIcon?: string;
  // emptyMessage?: string;
  // ariaLabel?: string;
  // togglerAriaLabel?: string;
  // ariaLabelledBy?: string;
  // validateDrop?: boolean;
  // filter?: boolean;
  // filterBy?: string;
  // filterMode?: string;
  // filterPlaceholder?: string;
  // filteredNodes?: TreeNode[];
  // filterLocale?: string;
  // scrollHeight?: string;
  // virtualScroll?: boolean;
  // virtualScrollItemSize?: number;
  // virtualScrollOptions?: ScrollerOptions;
  // indentation?: number;
}

export interface ICustomMenuItem extends MenuItem
{
  role?: string;
}
