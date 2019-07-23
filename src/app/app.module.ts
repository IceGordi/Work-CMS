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
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from "@angular/material";


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    TagPageComponent,
    SearchTagCategoryComponent,
    EditModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgMultiSelectDropDownModule.forRoot(),
    AngularFontAwesomeModule,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
