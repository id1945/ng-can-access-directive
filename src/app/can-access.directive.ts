import { Directive, OnInit, OnDestroy, Input, TemplateRef, ViewContainerRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthorizedService } from '../services';

@Directive({
  selector: '[appCanAccess]'
})
export class CanAccessDirective implements OnInit, OnDestroy {
  @Input()
  public appCanAccess: string | string[];
  private permission$: Subscription;

  constructor(private templateRef: TemplateRef<any>,
    private viewContainer: ViewContainerRef,
    private authService: AuthorizedService) { }

  ngOnDestroy() {
    this.permission$.unsubscribe();
  }

  ngOnInit() {
    this.applyPermission();
  }

  private applyPermission(): void {
    this.permission$ = this.authService
      .checkAuthorization(this.appCanAccess)
      .subscribe((authorized: any) => {
        if (authorized.code === '00') {
          this.viewContainer.createEmbeddedView(this.templateRef);
        } else {
          this.viewContainer.clear();
        }
      });
  }

}
