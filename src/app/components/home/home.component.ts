import { Component, OnInit, Inject } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { MatDialog } from '@angular/material';
import { CreateAmbitoComponent } from '../create-ambito/create-ambito.component';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ambitos:any[];
  modalRef: MDBModalRef;

  constructor(public generalService:GeneralService,
    public mdbService: MDBModalService) {
              this.generalService.returnArrayAmbitos()
              .subscribe(data=> this.ambitos = data);
              }

  ngOnInit() {
    this.ambitos = this.generalService.returnArrayAmbitos();
  }

  onCreateAmbito(){
    this.modalRef = this.mdbService.show(CreateAmbitoComponent);
  }
  onEdit(amb:any){}
  onDelete(amb:any){}
  
}
