import { animate, keyframes, state, style, transition, trigger } from '@angular/animations';
import { Component, Input } from '@angular/core';

import { Toast, ToastPackage, ToastrService } from 'ngx-toastr';

import { INotyfInterface } from 'core/components/statics/notyf/notyf.interface';

@Component(
  {
    selector: 'notyf-toast-component',
    styles: [],
    template: `
      <div class='notyf__toast notyf__toast--success notyf__toast'>
        <div class='notyf__wrapper'>
          <div class='notyf__icon'>
            <i [class]='config.iconClass' style='color: rgb(61, 199, 99);'></i>
          </div>
          <div class='notyf__message'>

            <div>
              {{ title }}
            </div>

            <div>
              {{ message }}
            </div>

          </div>
        </div>
        <div
          class='notyf__ripple'
          [class]='config.toastColorClass'>
        </div>
      </div>
    `,
    animations:
      [
        trigger(
          'flyInOut',
          [
            state('inactive', style({ opacity: 0 })),
            transition(
              'inactive => active',
              animate(
                '300ms ease-out',
                keyframes(
                  [
                    style(
                      {
                        opacity: 0,
                        bottom: '-15px',
                        'max-height': 0,
                        'max-width': 0,
                        'margin-top': 0
                      }
                    ),
                    style(
                      {
                        opacity: 0.8,
                        bottom: '-3px'
                      }
                    ),
                    style(
                      {
                        opacity: 1,
                        bottom: '0',
                        'max-height': '200px',
                        'margin-top': '12px',
                        'max-width': '400px'
                      }
                    )
                  ]
                )
              )
            ),
            state(
              'active',
              style(
                {
                  bottom: '0',
                  'max-height': '200px',
                  'margin-top': '12px',
                  'max-width': '400px'
                }
              )
            ),
            transition(
              'active => removed',
              animate(
                '300ms ease-out',
                keyframes(
                  [
                    style(
                      {
                        opacity: 1,
                        transform: 'translateY(0)'
                      }
                    ),
                    style(
                      {
                        opacity: 0,
                        transform: 'translateY(25%)'
                      }
                    )
                  ]
                )
              )
            )
          ]
        )
      ]
  })
export class NotyfToast extends Toast
{

  @Input()
  public config: INotyfInterface =
    {
      toastColorClass: 'bg-success',
      iconClass: 'notyf__icon--success'
    }



  constructor(
    protected toastrService: ToastrService,
    public toastPackage: ToastPackage
  )
  {
    super(toastrService, toastPackage);
  }


}
