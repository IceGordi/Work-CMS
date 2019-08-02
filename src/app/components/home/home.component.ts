import { Component, OnInit, Inject } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { MatDialog } from '@angular/material';
import { CreateAmbitoComponent } from '../create-ambito/create-ambito.component';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { ValidationService } from '../../services/validation.service';
import { Subscription, Subject } from 'rxjs';
import { EditAmbitoComponent } from '../edit-ambito/edit-ambito.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  ambitos:any[];
  modalRef: MDBModalRef;
  subscriptions:Subscription;
  private _unsuscribeAll: Subject;
  constructor(public generalService:GeneralService,
    public mdbService: MDBModalService,
    public validator: ValidationService) {
              this.generalService.returnArrayAmbitos()
              .subscribe(data=> this.ambitos =data);
              console.log(this.ambitos);
              this._unsuscribeAll = new Subject();
              }

  ngOnInit() {
    this.generalService.returnArrayAmbitos()
              .pipe(takeUntil(this._unsuscribeAll))
              .subscribe(data=> this.ambitos =data);
              console.log(this.ambitos);
  }
  public refresh(){
    this.ngOnInit();
  }
  onCreateAmbito(){
    this.subscriptions = this.mdbService.open.subscribe(() => console.log('open'));
    this.subscriptions.add(this.mdbService.opened.subscribe(() => console.log('opened')));
    this.subscriptions.add(this.mdbService.close.subscribe(() => console.log('close')));
    this.subscriptions.add(this.mdbService.closed.subscribe(() => {console.log('closed');this.ngOnInit(); this.unSubscribe()}));
    this.modalRef = this.mdbService.show(CreateAmbitoComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: '',
      containerClass: '',
      animated: true
  });
  }
  onEdit(amb:any){
    this.subscriptions = this.mdbService.open.subscribe(() => console.log('open'));
    this.subscriptions.add(this.mdbService.opened.subscribe(() => console.log('opened')));
    this.subscriptions.add(this.mdbService.close.subscribe(() => console.log('close')));
    this.subscriptions.add(this.mdbService.closed.subscribe(() => {console.log('closed');this.ngOnInit(); this.unSubscribe()}));
    this.modalRef = this.mdbService.show(EditAmbitoComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: '',
      containerClass: '',
      animated: true,
      data: {
        ambito: amb,
      }
  });
  }
  onDelete(amb:any){}
  unSubscribe(){
      this.subscriptions.unsubscribe();
    }
  }

