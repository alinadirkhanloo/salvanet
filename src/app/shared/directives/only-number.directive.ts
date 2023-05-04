import { CommonModule } from '@angular/common';
import { Directive, ElementRef, HostListener, Input, NgModule, OnInit } from '@angular/core';

@Directive(
  {
    selector: '[OnlyNumber]'
  }
)
export class OnlyNumber implements OnInit{


  private keyCodes= [46, 8, 9, 27, 13];

  constructor(
    private _el: ElementRef
  ) { }

  @Input() inactive = false;
  @Input() allowDot = false;


  @HostListener('keydown', ['$event'])
  public onKeyDown(e)
  {
    if (!this.inactive)
    {
      if (this.keyCodes.indexOf(e.keyCode) !== -1 ||
        // Allow: Ctrl+A
        (e.keyCode === 65 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+C
        (e.keyCode === 67 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+V
        (e.keyCode === 86 && (e.ctrlKey || e.metaKey)) ||
        // Allow: Ctrl+X
        (e.keyCode === 88 && (e.ctrlKey || e.metaKey)) ||
        // Allow: home, end, left, right
        (e.keyCode >= 35 && e.keyCode <= 39))
      {
        // let it happen, don't do anything
        return;
      }
      // Ensure that it is a number and stop the keypress
      if ((e.shiftKey || (e.keyCode < 48 || e.keyCode > 57)) && (e.keyCode < 96 || e.keyCode > 105))
      {
        e.preventDefault();
      }
    }
  }

  @HostListener('paste', ['$event'])
  public onPaste(e)
  {
    if(e.clipboardData.getData('text').search((/^[\d۰-۹]+$/g)) === -1 && !this.allowDot)
    {
      return false;
    }
    else if(e.clipboardData.getData('text').search((/^[\d۰-۹.]+$/g)) === -1 && this.allowDot)
    {
      return false;
    }
  }


  ngOnInit(): void
  {
    if(this.allowDot)
    {
      this.keyCodes.push(110, 190);
    }
  }
}

@NgModule(
  {
    imports: [CommonModule],
    declarations: [OnlyNumber],
    exports: [OnlyNumber]
  }
)
export class OnlyNumberModule {}
