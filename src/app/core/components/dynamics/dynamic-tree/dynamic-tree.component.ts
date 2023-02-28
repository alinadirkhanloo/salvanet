import { ChangeDetectorRef, Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';

import { TreeNode } from 'primeng/api';
import { Tree } from 'primeng/tree';
import { ContextMenu } from 'primeng/contextmenu';
import { ReplaySubject, Subscription } from 'rxjs';
import { IDynamicTree } from './dynamic-tree.interface';
import { CommonService } from 'core/services/common/common.service';
import { SharedService } from 'app/shared/services/shared.service';


const treeEventsList =
  [
    'selectionChange',
    'onNodeSelect',
    'onNodeUnselect',
    'onNodeExpand',
    'onNodeCollapse',
    'onNodeContextMenuSelect',
    'onNodeDrop',
    'onLazyLoad',
    'onScroll',
    'onScrollIndexChange',
    'onFilter'
  ];

@Component({
             selector: 'app-dynamic-tree',
             templateUrl: './dynamic-tree.component.html',
             styleUrls: ['./dynamic-tree.component.css']
           })
export class DynamicTreeComponent implements OnInit, OnDestroy
{

  @Input()
  public configs: IDynamicTree;

  @ViewChild(Tree, { read: Tree })
  public tree: Tree;

  @ViewChild(ContextMenu, { read: ContextMenu })
  public contextMenu: ContextMenu;

  public files: TreeNode[];
  public isLoaded = false;
  public subscription = new Subscription();


  constructor(
    private changeDetectorRef: ChangeDetectorRef,
    private commonService: CommonService,
    private sharedService: SharedService
  )
  {
  }

  ngOnInit(): void
  {
    /* checking User access level **/

    /* get headers node and also set contextMenu items **/
    this.subscription.add(
      this.configs.treeNodes$
        .subscribe(
          (data: TreeNode[]) =>
          {
            this.files = data;
            this.isLoaded = true;
            this.changeDetectorRef.detectChanges();
            if (this.configs.contextMenuItems)
            {
              this.tree.contextMenu = this.contextMenu;
            }
            this.handleEvents(treeEventsList);
          }
        )
    );


  }

  ngOnDestroy(): void
  {
    this.subscription.unsubscribe();
  }


  public nodeExpand(event: { node: TreeNode, originalEvent: unknown }): void
  {
    console.log(event.node);
    
    const lazyUrl = this.sharedService.createLazyUrl(
      event.node.data,
      this.configs.lazyUrl
    );

    this.subscription.add(
      this.commonService.getChild(lazyUrl)
        .subscribe(
          (nodes) => event.node.children = nodes
        )
    );
  }

  private handleEvents(eventsList: string[]): void
  {
    for (const eventName of eventsList)
    {
      if (this.configs[eventName])
      {
        this.subscription.add(
          this.tree[eventName].asObservable()
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
