import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Node } from '../_models';


@Injectable({ providedIn: 'root' })
export class MonitorService {

    API_URL = "http://localhost:8001";

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Node[]>(`${this.API_URL}`);
    }

    add(form: any) {
        return this.http.post<any>(`${this.API_URL}`, form).pipe(map(message => { return message; }));
    }
}