import {Component, Inject, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {GeneralService} from "../../services/general.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
})
export class EditModalComponent implements OnInit,OnChanges {
  @Input() tagToEdit:any;
  keyId:any= "";
  content:any="";
  formIsValid:boolean = false;

  constructor(public generalService: GeneralService,
              public dialogRef: MatDialogRef<EditModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.spreadData();
  }
  ngOnChanges(changes:SimpleChanges){
    this.formIsValid = this.checkValidityOfForm();
  }
submitEditForm(){
    this.generalService.editTag({keyId:this.keyId,content:this.content});
    this.closeDialog("submit");
}
spreadData(){
    this.keyId = this.tagToEdit.keyId;
}
closeDialog(mes:string): void {
    console.log("Closed dialog on click on:" + mes);
    this.dialogRef.close();
  }

checkValidityOfForm():boolean{
  return !(this.content === null || this.keyId === null || this.keyId === "");
}
}
