import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Api } from '../../../providers/api/api';

import { Tag } from './tag.model';

@Injectable()
export class TagService {
    private resourceUrl = Api.API_URL + '/tags';

    constructor(private http: HttpClient) { }

    create(tag: Tag): Observable<Tag> {
        return this.http.post(this.resourceUrl, tag);
    }

    update(tag: Tag): Observable<Tag> {
        return this.http.put(this.resourceUrl, tag);
    }

    find(id: number): Observable<Tag> {
        return this.http.get(`${this.resourceUrl}/${id}`);
    }

    query(req?: any): Observable<any> {
        return this.http.get(this.resourceUrl);
    }

    delete(id: number): Observable<any> {
        return this.http.delete(`${this.resourceUrl}/${id}`, { observe: 'response', responseType: 'text' });
    }
}
