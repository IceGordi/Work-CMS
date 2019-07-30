import {Component, Inject, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {GeneralService} from "../../services/general.service";
import {MAT_DIALOG_DATA, MatDialogRef,MatDialog} from "@angular/material";
import { ValidatorServiceService } from '../../services/validator-service.service';
import { of } from 'rxjs';

@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.css']
})
export class CreateModalComponent implements OnInit {
  ambitos: any = [];
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
              public validatorServiceService: ValidatorServiceService,
              public dialogRef2: MatDialogRef<CreateModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

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
    this.generalService.returnLanguages()
    .subscribe(data => this.languages = data['languages']);
  }
  ngOnChanges(changes:SimpleChanges){
    // this.formIsValid = this.checkValidityOfForm();
  }
  closeDialog(mes:string){
    console.log("Closed dialog on click on:" + mes);
    this.dialogRef2.close();
  }

  // checkValidityOfForm():boolean{
  //  return this.validatorServiceService.validateForm();
  // }
  submitCreateForm(){
    let index = 0;
    for(let lang of this.languages){
    this.generalService.addTag({keyId:this.keyId,content:this.contents[index],language:lang,id:this.keyId + "::" + lang,
                                docId: "Etiqueta" + "::" + this.keyId + "::" + lang, created:null,modified:null,available:true,
                                pages:this.filterAmbitos()});
   index++;
                           }
  }
  ambitosToMDE(){
    let i=0;
    for(let amb of this.ambitos){
      this.ambitosMDE.push({id: i, text: amb['keyId']});
      i++;
    }
  }
  filterAmbitos():any{
    let ambitosArr:any[];
    for(let sel of this. ambitosSelecMDE)
    {
      for(let amb of this.ambitos ){
          if(sel.text === amb.keyId)
          ambitosArr.push(amb);
      }
    }
    return ambitosArr;
  }
  
}

interface MDE {
  id:any;
  text:any;
}
