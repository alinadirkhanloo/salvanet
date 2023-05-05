import { CommonModule } from '@angular/common';
import { Directive, Input, ElementRef, TemplateRef, ViewContainerRef, NgModule } from '@angular/core';
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
    if(this.roleService.hasRole(val)) {
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
  export class HasRoleModule {}
  