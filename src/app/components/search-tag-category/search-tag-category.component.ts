import { Component, OnInit, Input } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { MatDialog} from '@angular/material/dialog';
import { EditModalComponent } from "../edit-modal/edit-modal.component";
import { CreateModalComponent } from "../create-modal/create-modal.component";
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
@Component({
  selector: 'app-search-tag-category',
  templateUrl: './search-tag-category.component.html',
  styleUrls: ['./search-tag-category.component.css']
})
export class SearchTagCategoryComponent implements OnInit {
  tags: any = [];
  termino: string[] = [];
  ambitos: any = [];
  dropdownSettings = {};
  ambitosMDE:MDE[] = [];
  ambitosSelecMDE:any = [];
  editingTag:any;
  
  modalRef: MDBModalRef;



  constructor(public generalService: GeneralService,public mdbService: MDBModalService,) { }
    ngOnInit() {
       this.generalService.returnArrayAmbitos()
       .subscribe(data => this.ambitos = data);
      // this.ambitos = this.generalService.getAmbitosTemp();
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
      this.ambitosToMDE();
    }    

    searchTags(t: any[]) {
      //this.tags = this.generalService.getTagTemp();
      this.generalService.getTagsWithAmbitos(t)
       .subscribe(data => this.tags = data);
    }

    onEdit(tag:any){
    this.editingTag = tag;
    }
    onDelete(tag:any){
    this.generalService.deleteTag(tag.keyId);
    }

    onChangeState(tag:any,state:boolean){
    let tagarr:any[] = [];
    tagarr.push({
        keyId:tag.keyId,
        content:tag.content,
        language:tag.language,
        id:tag.id,
        docId:tag.docId,
        created:tag.created,
        modified:tag.modified,
        available:state,
        type:tag.type,
      pages:tag.pages
      });
    this.generalService.editTag(tagarr);
    }

    onSubmit(etiqueta:any){
      let sarr = [];
      for(let amb of this.ambitosSelecMDE){
        sarr.push(this.ambitosSelecMDE['text']);
      }
      this.searchTags(sarr);
    }

    ambitosToMDE(){
      let i=0;
      for(let amb of this.ambitos){
        this.ambitosMDE.push({id: i, text: amb['keyId']});
        i++;
      }
    }
    createTag(){
      this.modalRef = this.mdbService.show(CreateModalComponent);
    }
  }
  interface MDE {
     id:any;
     text:any;
  }

