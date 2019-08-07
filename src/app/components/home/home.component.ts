import { Component, OnInit, OnDestroy } from '@angular/core';
import { GeneralService } from 'src/app/services/general.service';
import { CreateAmbitoComponent } from '../create-ambito/create-ambito.component';
import { MDBModalService, MDBModalRef } from 'angular-bootstrap-md';
import { ValidationService } from '../../services/validation.service';
import { Subscription, Subject} from 'rxjs';
import { EditAmbitoComponent } from '../edit-ambito/edit-ambito.component';
import {Router} from "@angular/router";
import{Location} from "@angular/common";
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy {

  url:String;

  languages:String[];
  private unsubscribeAll:Subject<any>;
  ambitos:any[];
  modalRef: MDBModalRef;
  subscriptions:Subscription;
  constructor(public generalService:GeneralService,
    public mdbService: MDBModalService,
    public validator: ValidationService,
              public router: Router,
              public location:Location) {
              this.url = this.location.path();
              this.unsubscribeAll = new Subject<any>();
              }

  ngOnInit() {
    this.generalService._refreshNeeded$.pipe(
      takeUntil(this.unsubscribeAll)
    )
    .subscribe((data) => {
      this.getAmbitos();
      console.log(data);
      this.languages = this.generalService.returnLanguages();
    });
  }

  getAmbitos():void{
    this.generalService.returnArrayAmbitos()
    .pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(data => this.ambitos = data);
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
    this.generalService.editAmbito(ambito).pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(
      result=> console.log("Houston we changed the state of the following:",result)
    )
  }

  onDelete(amb:any){
    let tags:any;
    let ambitos:any;
    let arr:any[];
    this.generalService.getTagsWithAmbitos(amb.keyId).pipe(
      takeUntil(this.unsubscribeAll)
    )
    .subscribe(data => {tags = data;});
    for(let i = 0; i<tags.length; i++){
      for(let j=0;i<tags[i].pages.length;j++){
        if(tags[i].pages[j].keyId == amb.keyId){
          tags[i].pages.splice(j,1);
        }
      }
    }
    this.generalService.editTag(tags).pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(() => console.log("removed {} from all etiquetas that contained it", amb));
    this.generalService.deleteAmbito(amb.keyId).pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(
        () => console.log("Permanently deleted item: {}", amb)
      );
  }
   ngOnDestroy(){
       this.unsubscribeAll.unsubscribe();
     }
  }

