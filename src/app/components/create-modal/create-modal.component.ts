import {Component, Inject, Input, OnChanges, OnInit, SimpleChange, SimpleChanges} from '@angular/core';
import {GeneralService} from "../../services/general.service";
import {MAT_DIALOG_DATA, MatDialogRef,MatDialog} from "@angular/material";


@Component({
  selector: 'app-create-modal',
  templateUrl: './create-modal.component.html',
  styleUrls: ['./create-modal.component.css']
})
export class CreateModalComponent implements OnInit {
  
  keyId:any= "";
  content:any="";
  formIsValid:boolean = false;
  constructor(public generalService: GeneralService,
              public dialogRef2: MatDialogRef<CreateModalComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
  }
  ngOnChanges(changes:SimpleChanges){
    this.formIsValid = this.checkValidityOfForm();
  }
  closeDialog(mes:string){
    console.log("Closed dialog on click on:" + mes);
    this.dialogRef2.close();
  }

  checkValidityOfForm():boolean{
    //BUNCH OF CHECKS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    return false;  //TEMPORARY
  }
  submitCreateForm(){
    this.generalService.addTag({keyId:this.keyId,content:this.content});
  }
}
