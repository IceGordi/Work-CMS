import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GeneralService } from 'src/app/services/general.service';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-create-ambito',
  templateUrl: './create-ambito.component.html',
  styleUrls: ['./create-ambito.component.css']
})
export class CreateAmbitoComponent implements OnInit {

  keyId: String;
  content: String;


  constructor(public generalService: GeneralService,
    public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

  submitCreateForm(addAmbitoForm:any){
    this.generalService.addAmbito({keyId:addAmbitoForm.controls['keyId'].value,
    content:addAmbitoForm.controls['content'].value,
    language:"es",id:this.keyId + "::es",
    docId: "Ambito::" + this.keyId + "::es",
     created:(new Date).getTime(),
     modified:(new Date).getTime(),
     available:true,
     type:"Ambito"});
     this.modalRef.hide();
  }
}
