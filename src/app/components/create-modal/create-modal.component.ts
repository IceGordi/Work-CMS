import {Component, Inject, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {GeneralService} from "../../services/general.service";
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
    this.languages =  this.generalService.returnLanguages();
    this.dropdownSettings = {
        singleSelection:false,
        idField: 'id',
        textField: 'text',
        selectAllText: 'Select All',
        unSelectAllText: 'UnSelect All',
        itemsShowLimit: 3,
        allowSearchFilter: true,
      }
  }
  // ngOnChanges(changes:SimpleChanges){
  //   // this.formIsValid = this.checkValidityOfForm();
  // }


  // checkValidityOfForm():boolean{
  //  return this.validatorServiceService.validateForm();
  // }

  filterAmbitos(arr:any):any{
    let ambitosArr:any[] = [];
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
    let arr:any[] = [];
    if (addEtiquetaForm.controls['pages'].value == null || addEtiquetaForm.controls['pages'].value.length < 1){
      console.log("error");
      this.modalRef.hide();
    }
    for(let lang of this.languages){
      arr.push({available: true,
               created: (new Date).getTime(),
              keyId: addEtiquetaForm.controls['keyId'].value,
              id: addEtiquetaForm.controls['keyId'].value + "::" + lang,
              docId: "etiqueta::" + addEtiquetaForm.controls['keyId'].value + "::" + lang,
              content:addEtiquetaForm.controls['content'+lang].value,
              language: lang,
              modified: (new Date).getTime(),
              pages: this.filterAmbitos(addEtiquetaForm.controls['pages'].value),
              type: "etiqueta",
            })
    }
    this.generalService.addTag(arr).subscribe(
      result=> console.log("Houston we created these things: {}",result)
    );
    this.modalRef.hide();
    }
}

interface MDE {
  id:any;
  text:any;
}
