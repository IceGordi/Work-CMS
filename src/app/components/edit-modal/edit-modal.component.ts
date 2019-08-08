import {Component, Inject, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {GeneralService} from "../../services/general.service";
import {MAT_DIALOG_DATA, MatDialogRef,MatDialog} from "@angular/material";
import {MDBModalRef} from "angular-bootstrap-md";


@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
})
export class EditModalComponent implements OnInit {
  @Input() tagToEdit:any;

  ambitos:any[];
  ambitosMDE: any[];
  etiqueta: any;
  etiquetasLangs:any[];
  ambitosSelecMDE:any[];

  contenidos:String[];

  languages:String[];
  dropdownSettings:any;

  constructor(public generalService: GeneralService,
              public modalRef: MDBModalRef) {
    this.languages =  this.generalService.returnLanguages();
    this.contenidos = new Array<String>(this.languages.length);
    this.dropdownSettings = {
      singleSelection:false,
      idField: 'id',
      tectField: 'text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true,
    }
  }

  ngOnInit() {
    this.generalService.getEtiquetasByKeyId(this.etiqueta.keyId)
      .subscribe((data) => this.etiquetasLangs = data);
    this.ambitosSelecMDE = this.ambitosToMDE(this.etiqueta.pages)
  }

  ambitosToMDE(ambi:any){
    let i=0;
    let arr:MDE[] = [];
    for(let amb of ambi){
      arr.push({id: i, text: amb['keyId']});
      i++;
    }
    return arr;
  }

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
onSubmit(){
    let arr:any[] = [];
    let ambSelecFilt = this.filterAmbitos(this.ambitosSelecMDE);
  for(let eti of this.etiquetasLangs){
    eti.pages = ambSelecFilt;
    arr.push(eti);
  }
  this.generalService.editTag(arr).subscribe(result => console.log("Houston we edited these things: {}",result));
  this.modalRef.hide();
}
}
interface MDE {
  id:any;
  text:any;
}
