import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  Input,
  OnDestroy,
  OnInit,
  Optional,
  Self,
  ViewChild
} from '@angular/core';
import { ControlValueAccessor, NgControl } from '@angular/forms';
import { ReplaySubject, Subscription } from 'rxjs';

import { TreeSelect } from 'primeng/treeselect';
import { TreeNode } from 'primeng/api';

import { IDynamicTreeSelect, ILazyMode } from 'core/components/dynamics/dynamic-tree-select/dynamic-tree-select.interface';
import { CommonService } from 'core/services/common/common.service';
import { SharedService } from 'shared/services/shared.service';

const eventsList =
  [
    'onShow',
    'onHide',
    'onFilter',
    'onNodeSelect',
    'onNodeUnselect',
    'onNodeExpand',
    'onNodeCollapse',
    'onClear'
  ];

@Component(
  {
    selector: 'app-dynamic-tree-select',
    templateUrl: './dynamic-tree-select.component.html',
    styleUrls: ['./dynamic-tree-select.component.css']
  }
)
export class DynamicTreeSelectComponent implements ControlValueAccessor, OnInit, OnDestroy, AfterViewInit
{
  @Input()
  public configs: IDynamicTreeSelect;
  @ViewChild(TreeSelect, { read: TreeSelect })
  public treeSelect: TreeSelect;

  public selectedNode: any = {};

  public subscription = new Subscription();
  public nodes: TreeNode[];
  public disabled: boolean;
  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    @Self() @Optional() public controlDir: NgControl,
    private commonService: CommonService,
    private sharedService: SharedService
  )
  {
    this.controlDir.valueAccessor = this;
  }

  ngOnInit(): void
  {
    this.initializeTree();
  }


  ngAfterViewInit(): void
  {
    if (this.configs.treeType.lazyMode)
    {
      this.onNodeExpand();
    }
  }

  ngOnDestroy(): void
  {
    this.subscription.unsubscribe();
  }

  public setDisabledState(isDisabled: boolean): void
  {
    this.disabled = isDisabled;
  }

  public registerOnChange(fn: any): void
  {
    this.onChange = fn;
  }


  public registerOnTouched(fn: any): void
  {
    this.onTouched = fn;
  }

  public writeValue(nodes: TreeNode): void
  {
    this.selectedNode = nodes;
  }


  public onChange: (event) => unknown;
  public onTouched: () => unknown;


  private initializeTree()
  {
    this.subscription.add(
      this.configs.treeNodes$
        .subscribe(
          (data: TreeNode[]) =>
          {
            this.nodes = data;
            this.handleEvents(eventsList);
          }
        )
    );
  }


  public onNodeExpand(): void
  {
    this.subscription.add(
      this.treeSelect.onNodeExpand
        .subscribe(
          (event) =>
          {
            this.updateLazyChild(event);
          }
        )
    );
  }


  public updateLazyChild(event: { node: TreeNode, originalEvent: Event }): void
  {
    const lazyUrl = this.sharedService.createLazyUrl(
      event.node.data,
      (this.configs.treeType as ILazyMode).lazyUrl
    );

    this.subscription.add(
      this.commonService.getChild(lazyUrl)
        .subscribe(
          (nodes) =>
          {
            event.node.children = nodes;
          }
        )
    );
  }

  public omitObject(keys: string[], obj: Object): Object
  {
    return this.sharedService.omitObject(keys, obj);
  }

  private handleEvents(eventsList: string[]): void
  {
    for (const eventName of eventsList)
    {
      if (this.configs[eventName])
      {
        this.subscription.add(
          this.treeSelect[eventName].asObservable()
            .subscribe(
              (event) =>
              {
                (this.configs[eventName] as ReplaySubject<any>).next(event);
              }
            )
        );
      }
    }
  }
}
