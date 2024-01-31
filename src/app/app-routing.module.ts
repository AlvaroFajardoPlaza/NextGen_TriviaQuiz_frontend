import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/layout/wrappers/home/home.component';
import { AuthWrapperComponent } from './components/layout/wrappers/auth-wrapper/auth-wrapper.component';
import { TriviaWrapperComponent } from './components/layout/wrappers/trivia-wrapper/trivia-wrapper.component';

const routes: Routes = [

  // { path: "", redirectTo: "home" },
  { path: '', component: HomeComponent },
  { path: 'auth', component: AuthWrapperComponent },

  // Las siguientes rutas corresponden con los trivia quizs y los usuarios identificados --> Auth Guard
  { path: 'trivia', component: TriviaWrapperComponent },

  // To do -----> Crear panel de usuario con respuestas completadas y score.
  //              Crear panel de resultados con los scores de los jugadores. 

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
