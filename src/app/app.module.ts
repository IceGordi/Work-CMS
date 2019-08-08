import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import{HttpClientModule} from '@angular/common/http';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { TagPageComponent } from './components/tag-page/tag-page.component';
import { SearchTagCategoryComponent } from './components/search-tag-category/search-tag-category.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { EditModalComponent } from './components/edit-modal/edit-modal.component';
import { CreateModalComponent } from './components/create-modal/create-modal.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { CreateAmbitoComponent } from './components/create-ambito/create-ambito.component';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { EditAmbitoComponent } from './components/edit-ambito/edit-ambito.component';
import { FAQComponent } from './components/faq/faq.component';
import {SelectModule} from 'ng2-select';
import { FaqCreateComponent } from './components/faq-create/faq-create.component';
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TagPageComponent,
    SearchTagCategoryComponent,
    EditModalComponent,
    CreateModalComponent,
    CreateAmbitoComponent,
    EditAmbitoComponent,
    FAQComponent,
    FaqCreateComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    AngularFontAwesomeModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MDBBootstrapModule.forRoot(),
    NgbModule,
    SelectModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [ CreateAmbitoComponent, CreateModalComponent, EditAmbitoComponent, EditModalComponent,FaqCreateComponent ]
})
export class AppModule { }
