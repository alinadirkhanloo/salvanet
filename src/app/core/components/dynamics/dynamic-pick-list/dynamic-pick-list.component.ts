import { Component, ContentChild, Input, OnDestroy, TemplateRef, ViewChild } from '@angular/core';
import { ReplaySubject, Subscription } from 'rxjs';

import { PickList } from 'primeng/picklist';

import { IDynamicPickList } from 'core/components/dynamics/dynamic-pick-list/dynamic-pick-list.interface';

const pickListEvents =
  [
    'onMoveToTarget',
    'onMoveToSource',
    'onMoveAllToTarget',
    'onMoveAllToSource',
    'onSourceReorder',
    'onTargetReorder',
    'onSourceSelect',
    'onTargetSelect',
    'onSourceFilter',
    'onTargetFilter'
  ];

@Component(
  {
    selector: 'app-dynamic-pick-list',
    templateUrl: './dynamic-pick-list.component.html',
    styleUrls: ['./dynamic-pick-list.component.css']
  }
)
export class DynamicPickListComponent implements OnDestroy
{

  @ContentChild(TemplateRef)
  public template: TemplateRef<any>

  @ViewChild(PickList)
  public pickList: PickList;


  @Input()
  public configs: IDynamicPickList;

  public subscription: Subscription;

  constructor()
  {
  }

  ngOnDestroy(): void
  {
    this.subscription.unsubscribe();
  }

  private handleEvents(eventsList: string[]): void
  {
    for (const eventName of eventsList)
    {
      if (this.configs[eventName])
      {
        this.subscription.add(
          this.pickList[eventName].asObservable()
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
