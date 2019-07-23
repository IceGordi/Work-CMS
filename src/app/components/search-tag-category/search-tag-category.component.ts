import { Component, OnInit, Input } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { ActivatedRoute } from '@angular/router';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {EditModalComponent} from "../edit-modal/edit-modal.component";

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
  

  constructor(public generalService: GeneralService,
              public dialog: MatDialog) { }
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
    this.openDialog();
    }

    openDialog(): void {
    const dialogRef = this.dialog.open(EditModalComponent, {
      width: '250px',
      data:  this.editingTag
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
    onDelete(tag:any){
    this.generalService.deleteTag(tag.keyId);
    }

    onSubmit(){
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
  }

  interface MDE {
     id:any;
     text:any;
  }

