import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavComponent } from './components/layout/shared_views/nav/nav.component';
import { FooterComponent } from './components/layout/shared_views/footer/footer.component';
import { HomeComponent } from './components/layout/wrappers/home/home.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { LoginComponent } from './components/auth/login/login.component';
import { TriviaWrapperComponent } from './components/layout/wrappers/trivia-wrapper/trivia-wrapper.component';
import { AuthWrapperComponent } from './components/layout/wrappers/auth-wrapper/auth-wrapper.component';
import { TriviaComponent } from './components/trivia/trivia/trivia.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopUpComponent } from './components/layout/pop-up/pop-up.component';


@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    FooterComponent,
    HomeComponent,
    RegisterComponent,
    LoginComponent,
    TriviaWrapperComponent,
    AuthWrapperComponent,
    TriviaComponent,
    PopUpComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
