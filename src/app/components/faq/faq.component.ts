import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subject} from "rxjs";
import {GeneralService} from "../../services/general.service";
import {MDBModalRef, MDBModalService} from "angular-bootstrap-md";
import {takeUntil} from "rxjs/operators";
import {CreateModalComponent} from "../create-modal/create-modal.component";
import {FaqCreateComponent} from "../faq-create/faq-create.component";

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.css'],
})
export class FAQComponent implements OnInit, OnDestroy {

  public faqs:any = [];
  public valueFAQ:any = {};
  public valueLANG:any = {};
  public langStrings:String[] = [];
  public faqsStrings:String[] = [];
  public faqSeleccionado:any;

  modalRef: MDBModalRef;
  private unsubscribeAll:Subject<any>;

  constructor(public generalService: GeneralService,public mdbService: MDBModalService) {
    this.unsubscribeAll = new Subject<any>();
    this.langStrings = this.generalService.returnLanguages()
    this.generalService.getAllFAQSByLang("es").pipe(
      takeUntil(this.unsubscribeAll)).subscribe((data) => this.faqs = data);

  }

  ngOnInit() {
    this.generalService._refreshNeeded$.pipe(
      takeUntil(this.unsubscribeAll)
    )
      .subscribe((data) => {});
  }

  getFAQS():void{
    this.generalService.getAllFAQS()
      .pipe(
        takeUntil(this.unsubscribeAll)
      ).subscribe(data => {this.faqs = data;
      this.faqsStrings = this.faqsToString(data);
      this.langStrings = this.generalService.returnLanguages()});
  }

  faqsToString(data:any){
    let arr:String[] = [];
    for(let faq of data){
      arr.push(faq.keyId);
    }
    return arr;
  }


  public refreshValueFAQ(value:any):void {
    this.valueFAQ = value;
    for(let faq of this.faqs){
      if(faq.keyId == value)
        this.faqSeleccionado = faq;
    }
  }
  public refreshValueLANG(value:any):void {
    this.valueLANG = value;
    this.generalService.getAllFAQSByLang(value)
      .pipe(
        takeUntil(this.unsubscribeAll)
      ).subscribe((data) => this.faqs = data);
  }

  onSubmit(){
  this.generalService.getFAQById(this.valueFAQ+"::"+this.valueLANG)
    .pipe(
      takeUntil(this.unsubscribeAll)
    )
    .subscribe((data) => {this.faqSeleccionado = data;
      this.faqsStrings = this.faqsToString(data);});
  }
  onEdit(faq:any){}
  onChangeState(faq:any,state:boolean){}
  onDelete(faq:any){}
  createFAQ(){
    this.modalRef = this.mdbService.show(FaqCreateComponent, {
      backdrop: true,
      keyboard: true,
      focus: true,
      show: false,
      ignoreBackdropClick: false,
      class: '',
      containerClass: '',
      animated: true,
    });
  }

  addQuestion(faq:any){}
  ngOnDestroy(){
    this.unsubscribeAll.unsubscribe();
  }
}
