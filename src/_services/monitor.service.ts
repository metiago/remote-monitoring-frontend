import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Node } from '../_models';


@Injectable({ providedIn: 'root' })
export class MonitorService {

    // API_URL = "http://localhost:8001";
    // WEBSOCKET_URL = "ws://localhost:8001";

    API_URL = "https://zbx3.herokuapp.com"
    WEBSOCKET_URL = "wss://zbx3.herokuapp.com"

    constructor(private http: HttpClient) { }

    getAll() {
        return this.http.get<Node[]>(`${this.API_URL}`)
    }

    getTimeZones() {        
        return this.http.get<string[]>(`${this.API_URL}/timezones/`)
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

    handleError(error: HttpErrorResponse){
        console.log("lalalalalalalala");
        return throwError(error);
    }
}