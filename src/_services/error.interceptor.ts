import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { MaterialHelper } from './material';

@Injectable()
export class ErrorInterceptor extends MaterialHelper implements HttpInterceptor {

    error: string = null;

    constructor() {
        super();
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(catchError(err => {
            if (err.status === 200 || err.status === 201) {
                this.checkHttpCallBack(err);
                return
            }           
            this.error = err;
            this.checkHttpCallBack(err);
            return throwError(this.error);
        }))
    }

    checkHttpCallBack(response: any) {
        
        switch (response.status) {
            case 201:
                this.showToast(response.body.message, this.clazzSuccess)
                break;
            case 404:
                this.showToast(response.error.message, this.clazzWarning)
                break;
            case 400:
                this.showToast(response.error.message, this.clazzWarning)
                break;
            case 500:
                this.showToast(response.statusText, this.clazzDanger)
                break;
        }
    }
}