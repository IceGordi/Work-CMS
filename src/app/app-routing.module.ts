import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TagPageComponent } from './components/tag-page/tag-page.component';
import {FAQComponent} from "./components/faq/faq.component";


const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'tag', component: TagPageComponent},
  {path: 'faq', component: FAQComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
