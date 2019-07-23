# NgCanAccessDirective

```
git clone https://github.com/id1945/ng-can-access-directive.git
cd ng-can-access-directive
npm install
ng serve --open
```

# Code
```html
<ul>
  <li *appCanAccess="'view.user'">
    <h2><a target="_blank" rel="noopener" href="#">Check permit user</a></h2>
  </li>
  <li *appCanAccess="['view.user','view.role']">
    <h2><a target="_blank" rel="noopener" href="#">Check permit user + role</a></h2>
  </li>
  <li *appCanAccess="['view.admin','view.dashboard']">
    <h2><a target="_blank" rel="noopener" href="#">Check permit admin + dashborad</a></h2>
  </li>
</ul>
```
```javascript
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
```


# Deploy github server
# angular-cli-ghpages

## Installation & Setup
````
npm i angular-cli-ghpages --save-dev
````

## Usage

Usage With Angular Cli 6 Or Higher
````
ng build --prod
npx ngh --dir=dist/<project-name>
````
```html
<base href="/ng-can-access-directive/">
```
