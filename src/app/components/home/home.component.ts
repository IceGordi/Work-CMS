import { Component, OnInit, OnDestroy } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { CreateAmbitoComponent } from '../create-ambito/create-ambito.component';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { ValidationService } from '../../services/validation.service';
import { Subscription} from 'rxjs';
import { EditAmbitoComponent } from '../edit-ambito/edit-ambito.component';
import {Router} from "@angular/router";
import{Location} from "@angular/common";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  url:String;

  languages:String[];

  ambitos:any[];
  modalRef: MDBModalRef;
  subscriptions:Subscription;
  constructor(public generalService:GeneralService,
    public mdbService: MDBModalService,
    public validator: ValidationService,
              public router: Router,
              public location:Location) {
              this.generalService.returnArrayAmbitos()
              .subscribe(data=> this.ambitos =data);
              console.log(this.ambitos);
              this.url = this.location.path();
              }

  ngOnInit() {
    this.generalService.refreshNeeded$.subscribe(() => {
      this.generalService.returnArrayAmbitos()
        .subscribe(data => this.ambitos = data);
      console.log(this.ambitos);
      //this.generalService.returnLanguages().subscribe(data => this.languages = data);
      this.languages = this.generalService.returnLanguages();
    });
    this.generalService.returnArrayAmbitos()
      .subscribe(data => this.ambitos = data);
    console.log(this.ambitos);
    this.languages = this.generalService.returnLanguages();
  }
  onCreateAmbito(){
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
  onChangeState(amb:any,state:boolean){
   let ambito:any[] = [];
    ambito.push({
     keyId:amb.keyId,
     content:amb.content,
     language:amb.language,
     id:amb.id,
     docId:amb.docId,
     created:amb.created,
     modified:amb.modified,
     available:state,
     type:amb.type,
   });
    this.generalService.editAmbito(ambito).subscribe(
      result=> console.log("Houston we changed the state of the following:",result)
    )
  }

  onDelete(amb:any){
    this.generalService.deleteAmbito(amb.keyId)
      .subscribe(
        () => console.log("Permanently deleted item: {}", amb.toString())
      );
  }
  // ngOnDestroy(){
  //     this.subscriptions.unsubscribe();
  //   }
  }

