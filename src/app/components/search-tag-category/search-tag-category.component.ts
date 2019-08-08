import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { MatDialog} from '@angular/material/dialog';
import { EditModalComponent } from "../edit-modal/edit-modal.component";
import { CreateModalComponent } from "../create-modal/create-modal.component";
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import {Subject} from "rxjs";
import {takeUntil} from "rxjs/operators";
@Component({
  selector: 'app-search-tag-category',
  templateUrl: './search-tag-category.component.html',
  styleUrls: ['./search-tag-category.component.css']
})
export class SearchTagCategoryComponent implements OnInit,OnDestroy {
  tags: any = [];
  termino: string[] = [];
  ambitos: any[] = [];
  ambitosMDE:MDE[] = [];
  ambitosSelecMDE:any = [];
  editingTag:any;
  dropdownSettings = {};
  modalRef: MDBModalRef;

  private unsubscribeAll:Subject<any>;


  constructor(public generalService: GeneralService,public mdbService: MDBModalService) {
    this.unsubscribeAll = new Subject<any>();
    this.getAmbitos();
  }



    ngOnInit() {
      this.generalService._refreshNeeded$.pipe(
        takeUntil(this.unsubscribeAll)
      )
        .subscribe((data) => {
          this.getAmbitos();
          this.onSubmit();
        });

      // this.ambitos = this.generalService.getAmbitosTemp();
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


  getAmbitos():void{
    this.generalService.returnArrayAmbitos()
      .pipe(
        takeUntil(this.unsubscribeAll)
      ).subscribe(data => {this.ambitos = data;
                  this.ambitosMDE = this.ambitosToMDE(data)});
  }

    searchTags(t: any[]) {
      //this.tags = this.generalService.getTagTemp();
      this.generalService.getTagsWithAmbitos(t)
        .pipe(
          takeUntil(this.unsubscribeAll)
        ).subscribe(data => {this.tags = data});
    }

    onEdit(tag:any){
      this.modalRef = this.mdbService.show(EditModalComponent, {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: false,
        ignoreBackdropClick: false,
        class: '',
        containerClass: '',
        animated: true,
        data: {
          ambitos:this.ambitos,
          ambitosMDE: this.ambitosMDE,
          etiqueta: tag,
        }
      });
    }
    onDelete(tag:any){
    this.generalService.deleteTag(tag.keyId).pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((data) => console.log("Houston we have deleted all etiquetas with keyId: {}", tag.keyId));
    }

    getEtiquetasByKeyId(keyId:String):any{
      let tagarr:any[];
    return tagarr;
    }


    //HERE NEED TO CHANGE FOR USING DIFFERENT LANGUAGES
    onChangeState(tag:any,state:boolean) {
      let tagarr: any;
      let req = this.generalService.getEtiquetasByKeyId(tag.keyId)
        .pipe(
          takeUntil(this.unsubscribeAll)
        )
        .subscribe((data) => {
          tagarr = data;
          for (let i = 0; i < tagarr.length; i++) {
            tagarr[i].available = state;
          }
          this.generalService.editTag(tagarr)
            .pipe(
              takeUntil(this.unsubscribeAll)
            ).subscribe((data) => console.log("Houston we have changed the tags with keyId: {}", tag.keyId));
        });
    }



    onSubmit(){
      let sarr = [];
      if(this.ambitosSelecMDE.length == 0)
        return;
      for(let amb of this.ambitosSelecMDE){
        sarr.push(amb['text']);
      }
      this.searchTags(sarr);
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
    createTag(){
      this.modalRef = this.mdbService.show(CreateModalComponent, {
        backdrop: true,
        keyboard: true,
        focus: true,
        show: false,
        ignoreBackdropClick: false,
        class: '',
        containerClass: '',
        animated: true,
        data: {
          ambitos:this.ambitos,
          ambitosMDE: this.ambitosMDE
        }
    });
    }
    ambitosDeEtiquetasHeaders(etiqueta:any):string{
    let ambArr:string = "";
    for(let ambito of etiqueta.pages){
      ambArr += ambito.keyId + ",";
    }
   let str = ambArr.substring(0,ambArr.length-1);
    return str;
    }

    ngOnDestroy(): void {
      this.unsubscribeAll.unsubscribe();
    }
}
  interface MDE {
     id:any;
     text:any;
  }

