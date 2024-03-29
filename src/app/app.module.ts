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
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PopUpComponent } from './components/layout/pop-up/pop-up.component';
import { GenerateTriviaCardComponent } from './components/trivia/generate-trivia-card/generate-trivia-card.component';
import { PollWrapperComponent } from './components/layout/wrappers/poll-wrapper/poll-wrapper.component';
import { AuthInterceptor } from './core/interceptors/auth.interceptor';

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
		PopUpComponent,
		GenerateTriviaCardComponent,
		PollWrapperComponent
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		HttpClientModule,
		FormsModule,
		ReactiveFormsModule
	],
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: AuthInterceptor,
			multi: true
		}
	],
	bootstrap: [AppComponent]
})
export class AppModule {}
