import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/layout/wrappers/home/home.component';
import { AuthWrapperComponent } from './components/layout/wrappers/auth-wrapper/auth-wrapper.component';
import { TriviaWrapperComponent } from './components/layout/wrappers/trivia-wrapper/trivia-wrapper.component';
import { PopUpComponent } from './components/layout/pop-up/pop-up.component';
import { PollWrapperComponent } from './components/layout/wrappers/poll-wrapper/poll-wrapper.component';

const routes: Routes = [
	{ path: '', component: HomeComponent },
	{ path: 'auth', component: AuthWrapperComponent },

	// Las siguientes rutas corresponden con los trivia quizs y los usuarios identificados --> Auth Guard
	{ path: 'trivia', component: TriviaWrapperComponent }, // Para realizar los tests
	{ path: 'poll', component: PollWrapperComponent }, // Para ver las puntuaciones de los usuarios

	{ path: 'pop-up', component: PopUpComponent }
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {}
