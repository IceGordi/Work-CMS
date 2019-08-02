import { Component, OnInit } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-edit-ambito',
  templateUrl: './edit-ambito.component.html',
  styleUrls: ['./edit-ambito.component.css']
})
export class EditAmbitoComponent implements OnInit {

  ambito:any;

  constructor(public generalService: GeneralService,
    public modalRef: MDBModalRef) {

     }

  ngOnInit() {
  }

  submitEditForm(){
     let ambArr: any[] = [];
     ambArr.push(this.ambito);
     this.generalService.editAmbito(ambArr)
      .subscribe(
        result=> console.log("Houston we edited this things: {}",result)
      );

     this.modalRef.hide();
  }

}
