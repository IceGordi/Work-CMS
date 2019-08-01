import {Component, Inject, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {GeneralService} from "../../services/general.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import { MDBModalRef } from 'angular-bootstrap-md';


@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.css']
})
export class CreateModalComponent implements OnInit {
  
  
  
  ambitos: any[] = [];
  dropdownSettings = {};
  ambitosMDE:MDE[] = [];
  ambitosSelecMDE:any = [];


  keyId:String= "";
  pages:any[]=null;
  formIsValid:boolean = false;

  available:boolean = true;

  contents:String[];
  
  languages:String[];
 



  constructor(public generalService: GeneralService,
    public modalRef: MDBModalRef) { }

  ngOnInit() {
    this.generalService.returnArrayAmbitos()
    .subscribe(data => this.ambitos = data);
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
      limitSelection: 2
    };
    this.languages =  this.generalService.returnLanguages();
   // .subscribe(data => this.languages = data['languages']);
  }
  ngOnChanges(changes:SimpleChanges){
    // this.formIsValid = this.checkValidityOfForm();
  }
 

  // checkValidityOfForm():boolean{
  //  return this.validatorServiceService.validateForm();
  // }

  ambitosToMDE(){
    let i=0;
    for(let amb of this.ambitos){
      this.ambitosMDE.push({id: i, text: amb['keyId']});
      i++;
    }
  }
  filterAmbitos(arr:any):any{
    let ambitosArr:any[];
    for(let sel of arr)
    {
      for(let amb of this.ambitos ){
          if(sel.text === amb.keyId)
          ambitosArr.push(amb);
      }
    }
    return ambitosArr;
  }
  

  onFormSubmit(addEtiquetaForm: any){
    let arr:any[];
    for(let lang of this.languages){
      arr.push({available: true,
               created: (new Date).getTime(),
              keyId: addEtiquetaForm.controls['keyId'].value,
              id: addEtiquetaForm.controls['keyId'].value + "::" + lang,
              docId: "Etiqueta::" + addEtiquetaForm.controls['keyId'].value + "::" + lang,
              content:addEtiquetaForm.controls['content'+lang].value,
              modified: (new Date).getDate(),
              pages: this.filterAmbitos(addEtiquetaForm.controls['pages'].value),
            })
    }
    this.modalRef.hide();
    }
}

interface MDE {
  id:any;
  text:any;
}
