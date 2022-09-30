import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { HttpClientModule } from '@angular/common/http';
import { OverdueComponent } from './overdue/overdue.component';
import { FinishedComponent } from './finished/finished.component';
import { TodayComponent } from './today/today.component';
import { ManageComponent } from './manage/manage.component';
import { PromptComponent } from './prompt/prompt.component';
import { SimpleModalModule } from 'ngx-simple-modal';
import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    OverdueComponent,
    FinishedComponent,
    TodayComponent,
    ManageComponent,
    PromptComponent,
    LoginComponent,
    NavbarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    SimpleModalModule.forRoot({container: "modal-container"}),
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [
    PromptComponent
  ]
})
export class AppModule { }
