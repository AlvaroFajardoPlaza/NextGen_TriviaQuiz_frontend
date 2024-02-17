import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Observable, Subscription, firstValueFrom } from 'rxjs';
import { AuthService } from 'src/app/components/auth/auth.service';
import { MyTriviaService } from 'src/app/components/trivia/my-trivia.service';
import { User } from 'src/app/data/models/User.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private __router = inject(Router);
  private __trivisSvc = inject(MyTriviaService)
  private __authSvc = inject(AuthService)
  private __formBuilder = inject(FormBuilder)

  registeredUser$: Observable<User> = this.__authSvc.user$

  categories$: Observable<Array<any>> = this.__trivisSvc.getCategories()

  categorizedForm: FormGroup | any


  constructor(){
    this.initialiceCategorizedForm()
  }


  // Tenemos que crear nuestro formulario que recoja las 3 opciones mínimas del select
  initialiceCategorizedForm(){
    this.categorizedForm = this.__formBuilder.group({
      categories: ['', [Validators.required]]
    })
  }

  async onSubmit() {
    const response = await this.__trivisSvc.getCategorizedTrivia(
      this.categorizedForm.value
    );

    console.log("Esta es la respuesta que recibimos y que tenemos que mandar al componente de 'trivia': ", response)
  }


  // Redirecciones de los botones
  goToRandomTrivia() {
    this.__router.navigate(['trivia']);
  }

  navigateToRegisterLogin() {
    this.__router.navigate(['auth'])
  }
}
