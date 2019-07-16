import { Component, OnInit, Input } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { ActivatedRoute } from '@angular/router';
import { Select2Data } from 'ng-select2-component/public_api';

@Component({
  selector: 'app-search-tag-category',
  templateUrl: './search-tag-category.component.html',
  styleUrls: ['./search-tag-category.component.css']
})
export class SearchTagCategoryComponent implements OnInit {
  tags: any[] = [];
  termino: string;
  ambitos: any = [];

  ambitosSeleccionados: any;
  select2Data: Select2Data;

  constructor(public generalService: GeneralService,
              public activatedRoute: ActivatedRoute) { }
    ngOnInit() {
      this.ambitos = this.generalService.ambitos;
      this.formatSelect2Data();
    }    
    searchTags(t: any[]) {
        // THIS LOGIC IS ONLY HERE WHILE ANGULAR IS NOT CONNECTED TO THE BACK
        // ONCE CONNECTED THIS LOGIC IS SUPPOSED TO BE RUN BY JAVA
        let tagArray: any = [];
        this.termino = this.termino.toLocaleLowerCase();
        const tagsList = this.generalService.returnArrayTags();
        for (let tag of tagsList){
          for(let page of tag.pages){
            if (page.id == t){
            tagArray.push(tag);
            }
          }
        }
        this.tags = tagArray;
      }
        returnAmbitos(){
          this.tags =  this.generalService.returnArrayTags();
    }


    formatSelect2Data() {
      let aux = [];
      for (let amb of this.ambitos) {
        let ambito = {};
        ambito["value"] = amb.keyId;
        ambito["label"] = amb.content;
        ambito["item"] = amb;

        aux.push(ambito);
      }
      this.select2Data = JSON.parse(JSON.stringify(aux));
    }

    onSubmit(f:any){
      this.ambitosSeleccionados = f;
      searchTags(this.ambitosSeleccionados);
    }
  }

