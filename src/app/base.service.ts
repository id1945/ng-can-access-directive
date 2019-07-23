import { HttpClient, HttpHeaders } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable } from 'rxjs'

import { environment } from 'src/environments/environment';
import { AppConfig } from 'src/app/app.config';

@Injectable({
    providedIn: 'root'
})
export class BaseService {

    private API_URL_BASE: string = environment.baseApiUrl;

    public constructor(private httpClient: HttpClient, private config: AppConfig) {
        this.API_URL_BASE = this.config['config']['baseApiUrl'];
    }

    public httpGet(endPoint: string, queryParams?: any): Observable<Object> {
        return this.httpClient.get(this.buildApiUrl(endPoint, queryParams))
    }

    public httpPost(endPoint: string, bodyParams: any): Observable<Object> {
        return this.httpClient.post(this.buildApiUrl(endPoint), bodyParams)
    }

    public httpPatch(endPoint: string, bodyParams?: any): Observable<Object> {
        return this.httpClient.patch(endPoint, bodyParams)
    }

    public httpPut(endPoint: string, bodyParams?: any): Observable<Object> {
        return this.httpClient.put(this.buildApiUrl(endPoint), bodyParams)
    }

    public httpDelete(endPoint: string, bodyParams?: any): Observable<Object> {
        return this.httpClient.request('delete', this.buildApiUrl(endPoint), { body: bodyParams })
    }

    private buildApiUrl(endPoint: string, queryParams?: object): string {
        var apiUrl = this.API_URL_BASE

        if (endPoint.startsWith('/')) {
            endPoint = endPoint.substr(1)
        }
        apiUrl += '/' + endPoint

        if (queryParams) {
            var queryString = Object.keys(queryParams).map(
                key => key + '=' + queryParams[key]
            ).join('&')

            apiUrl += '?' + queryString
        }

        return apiUrl
    }
}
