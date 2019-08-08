import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../services/general.service";
import {MDBModalRef} from "angular-bootstrap-md";

@Component({
  selector: 'app-faq-create',
  templateUrl: './faq-create.component.html',
  styleUrls: ['./faq-create.component.css']
})
export class FaqCreateComponent implements OnInit {

  public keyId:String;
  public languages:String[];

  constructor(public generalService: GeneralService,
              public modalRef: MDBModalRef) {
    this.languages = generalService.returnLanguages();
  }

  ngOnInit() {
  }

  onSubmit(){
    let faqArr:any[] = [];
    for(let lang of this.languages) {
      faqArr.push({
        keyId: this.keyId,
        language: lang,
        id: this.keyId + "::" + lang,
        docId: "faq::" + this.keyId + "::" + lang,
        created: (new Date).getTime(),
        modified: (new Date).getTime(),
        available: true,
        type: "faq"
      });
    }
    this.generalService.addFAQ(faqArr)
      .subscribe(
        result=> console.log("Houston we created this things: {}",result)
      );

    this.modalRef.hide();
  }
}
