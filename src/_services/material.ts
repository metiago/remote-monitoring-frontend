import { Injectable } from '@angular/core';

declare var $:any;
declare var M: any;
const toastTime: number = 6000;

@Injectable({ providedIn: 'root' })
export class MaterialHelper {   
    
    clazzWarning = "clazz-warning toast-identifier-for-message";
    clazzDanger = "clazz-danger toast-identifier-for-message";
    clazzSuccess = "clazz-success toast-identifier-for-message";
    
    constructor() { }

    showToast(message: any, clazz: any) {
        M.toast({ html: message, classes: clazz }, toastTime);
    }
    
    updateFields() {
        setTimeout(function () { $('.input-field label').addClass('active'); }, 1);
    }

    openModal(ID: string) {        
        let elem = document.querySelector(ID);
        let instances = M.Modal.init(elem, ['']);
        instances.open();
    }

    closeModal(ID: string) {        
        let elem = document.querySelector(ID);
        let instances = M.Modal.init(elem, ['']);
        instances.close();
    }
}