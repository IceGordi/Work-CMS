import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ValidationService {

  constructor() { }

  filterAmbitos(objArr:any[]){
  let arr:any[] = [];
    for(let obj of objArr){
    arr.push(obj['etiquetasBucket']);
  }  
  return arr;
  }
}
