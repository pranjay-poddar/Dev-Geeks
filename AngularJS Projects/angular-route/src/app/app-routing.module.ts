import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Container1Component } from './container1/container1.component';
import { Container2Component } from './container2/container2.component';
import { Container3Component } from './container3/container3.component';
import { Container4Component } from './container4/container4.component';

const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'container1', component: Container1Component},
  {path: 'container2', component: Container2Component},
  {path: 'container3', component: Container3Component},
  {path: 'container4', component: Container4Component},
  
 
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
