import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../services/general.service";

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.css'],
})
export class EditModalComponent implements OnInit {

  keyIdIni:any = "";
  keyId:any= "";
  contentIni:any = "";
  content:any="";

  constructor() {generalService:GeneralService}

  ngOnInit() {
  }
submitEditForm(){
    generalService.edit({keyId:this.keyId,content:this.content});
}
}
