import { Directive } from '@angular/core';

@Directive({
  selector: '[appCanAccess]'
})
export class CanAccessDirective {

  constructor() { }

}
