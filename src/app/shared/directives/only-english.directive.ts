import { CommonModule } from '@angular/common';
import { Directive, ElementRef, HostListener, Input, NgModule, OnInit } from '@angular/core';

@Directive(
    {
        selector: '[OnlyEnglish]'
    }
)
export class OnlyEnglish implements OnInit {


    private keyCodes = [46, 8, 9, 27, 13];
    private regex = new RegExp("^[a-z0-9]+([._]{0,1})[a-z0-9]+*$");
    constructor() { }

    @HostListener('keydown', ['$event'])
    public onKeyDown(e) {
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
            (e.keyCode >= 35 && e.keyCode <= 39)) {
            // let it happen, don't do anything
            return;
        }
        // Ensure that it is a number and stop the keypress
        let str = String.fromCharCode(!e.charCode ? e.which : e.charCode);

        if (this.regex.test(str)) {
            return true;
        }

        else {
            e.preventDefault();
            return false;
        }

    }

    @HostListener('paste', ['$event'])
    public onPaste(e) {
        if (e.clipboardData.getData('text').search(this.regex) === -1) {
            return false;
        }
        else if (e.clipboardData.getData('text').search(this.regex) === -1) {
            return false;
        }
    }


    ngOnInit(): void {}
}

@NgModule(
    {
        imports: [CommonModule],
        declarations: [OnlyEnglish],
        exports: [OnlyEnglish]
    }
)
export class OnlyEnglishModule { }
