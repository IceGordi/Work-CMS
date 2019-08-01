import { Component, OnInit, Inject } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { MatDialog } from '@angular/material';
import { CreateAmbitoComponent } from '../create-ambito/create-ambito.component';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { ValidationService } from '../../services/validation.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ambitos:any[];
  modalRef: MDBModalRef;

  constructor(public generalService:GeneralService,
    public mdbService: MDBModalService,
    public validator: ValidationService) {
              this.generalService.returnArrayAmbitos()
              .subscribe(data=> this.ambitos = this.validator.filterAmbitos(data));
              console.log(this.ambitos);
              }

  ngOnInit() {
  }

  onCreateAmbito(){
    this.modalRef = this.mdbService.show(CreateAmbitoComponent);
  }
  onEdit(amb:any){}
  onDelete(amb:any){}
  
}
