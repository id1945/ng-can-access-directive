import { Injectable } from '@angular/core';
import 'rxjs/add/observable/of';

import { BaseService } from '../../core/services/base.service';

@Injectable()
export class AuthorizedService {
    private ENDPOINT: string;

    public checkAuthorization(permission: string | string[]) {
        if (permission instanceof Array) {
            permission = permission.join(',');
        }
        return this.baseService.httpPost(`${this.ENDPOINT}/checkUserPermission`, { id: permission });
    }

    constructor(private baseService: BaseService) {
        this.ENDPOINT = 'authorized';
    }
}
