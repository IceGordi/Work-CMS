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

  keyId: String="";
  content: String="";


  constructor(public generalService: GeneralService,
    public modalRef: MDBModalRef) { }

  ngOnInit() {
  }

  submitCreateForm(addAmbitoForm:any){
    let amb:any = {keyId:addAmbitoForm.value.keyId,
      content:addAmbitoForm.value.content,
      language:"es",id:addAmbitoForm.value.keyId + "::es",
      docId: "ambito::" +addAmbitoForm.value.keyId + "::es",
       created:(new Date).getTime(),
       modified:(new Date).getTime(),
       available:true,
       type:"ambito"}
    let ambArr: any[] = [];
    ambArr.push(amb);
    this.generalService.addAmbito(ambArr)
     .subscribe(
       result=> console.log("Houston we created this things: {}",result)
     );

     this.modalRef.hide();
  }
  onClose(event: any) {
    console.log(event);
  }
}
