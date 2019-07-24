import { Directive, OnInit, OnDestroy, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthorizedService } from './authorized.service';

@Directive({
  selector: '[appCanAccess]'
})
export class CanAccessDirective implements OnInit, OnDestroy {
  @Input()
  public appCanAccess: string | string[];
  private permission$: Subscription;

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthorizedService
  ) { }

  ngOnDestroy() {
    this.permission$.unsubscribe();
  }

  ngOnInit() {
    this.applyPermission();
  }

  private applyPermission(): void {
    // this.permission$ = this.authService.checkAuthorization(this.appCanAccess).subscribe((authorized: any) => {
    //     if (authorized.code === '00') {
    //       this.viewContainer.createEmbeddedView(this.templateRef);
    //     } else {
    //       this.viewContainer.clear();
    //     }
    //   });
    // ========= Demo api begin ===========
    if (typeof this.appCanAccess === 'object') {
      // Được hiển thị màn hình user và role
      if (this.appCanAccess.filter(x => x === 'view.user' || x === 'view.role').length > 0) {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        // không cho phép hiển thị
        this.viewContainer.clear();
      }
    }
    if (typeof this.appCanAccess === 'string') {
      // Được hiển thị màn hình user
      if (this.appCanAccess === 'view.user') {
        this.viewContainer.createEmbeddedView(this.templateRef);
      } else {
        // không cho phep hiển thị
        this.viewContainer.clear();
      }
    }
    // =========== End demo ================
  }

}
