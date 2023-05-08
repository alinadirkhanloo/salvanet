import { CommonModule } from '@angular/common';
import { Directive, Input, TemplateRef, ViewContainerRef, NgModule } from '@angular/core';
import { RolesService } from '../services/role.service';

@Directive({
    selector: '[ifHasRole]'
})
export class HasRoleDirective {

    constructor(
        private roleService: RolesService,
        private templateRef: TemplateRef<any>,
        private viewContainer: ViewContainerRef
    ) {
    }

    @Input()
    set ifHasRole(val) {
        if (val instanceof Array) {

            let temp = val.filter(itm => {
                return this.roleService.hasRole(itm);
            });

            if (temp.length >0) {
                this.viewContainer.createEmbeddedView(this.templateRef);
            } else {
                this.viewContainer.clear();
            }
        } else if (this.roleService.hasRole(val)) {
            this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
            this.viewContainer.clear();
        }
    }
}

@NgModule(
    {
        imports: [CommonModule],
        declarations: [HasRoleDirective],
        exports: [HasRoleDirective]
    }
)
export class HasRoleModule { }
