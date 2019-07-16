import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./components/home/home.component";
import { TagPageComponent } from './components/tag-page/tag-page.component';


const routes: Routes = [
  {path: 'home', component: HomeComponent },
  {path: 'tag', component: TagPageComponent},
  {path: '**', pathMatch: 'full', redirectTo: 'home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
