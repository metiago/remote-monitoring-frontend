import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Node } from '../_models';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class MonitorService {

    API_URL = "http://localhost:8001";

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Node[]>(`${this.API_URL}`)
    }

    add(form: any) {
        return this.http.post<any>(`${this.API_URL}`, form)
    }

    detail(key: string) {
        return this.http.get<any>(`${this.API_URL}/${key}`);
    }

    delete(key: string) {
        return this.http.delete<any>(`${this.API_URL}/${key}`);
    }

    export() {
        return this.http.get<Node[]>(`${this.API_URL}/export/`)
    }

    upload(nodes: Node[]) {
        return this.http.post<any>(`${this.API_URL}/upload/`, nodes)
    }
}