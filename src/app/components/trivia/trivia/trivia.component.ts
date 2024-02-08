import { Component, OnInit, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TriviaElement } from 'src/app/data/models/TriviaElement.interface';
import { MyTriviaService } from '../my-trivia.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.scss']
})
export class TriviaComponent implements OnInit{
  private _triviaSvc = inject(MyTriviaService)
  private _router = inject(Router)
  private _formBuilder = inject(FormBuilder)

  triviaTest$: Observable<Array<any>> = this._triviaSvc.getRandomTrivia();
  randomTest: Array<TriviaElement> = [];

  categories$: Observable<Array<any>> = this._triviaSvc.getCategories();

  user_trivia_solution: FormGroup | any

  constructor() {
    this.initializeForm()
  }

  ngOnInit(): void {
    console.log("renderizamos el componente trivia")
    this.oneMinuteCounter()
  }

  // Cuando el usuario envíe un trivia test al backend, envía un formulario con las 10 preguntas y las respuestas elegidas.
  initializeForm() {
    this.user_trivia_solution = this._formBuilder.group({
      // Aquí dentro manejamos las respuestas del user
    })
  }

  onSubmit() {
    console.log("enviamos los datos de nuestro formulario a la ruta del backend para corregir")
  }


  // El initialCounter puede ser una variable que manejen los usuarios
  initialCounter: number = 45
  oneMinuteCounter() {
    const count: any = document.querySelector(".counter")
    // let counter = 60

    setInterval(() => {
      if(this.initialCounter > 0) {
        this.initialCounter--;
        count.innerHTML = this.initialCounter.toString();
      // } else if(0 < this.initialCounter && this.initialCounter < 10) {
      //   this.initialCounter--;
      //   count.innerHTML = this.initialCounter.toString()
      //   count.innerHTML = document.createAttribute(".hurry_up")
      } else {
        this.navigateHome()
      }
    }, 1000)
  }

  navigateHome() {
    return this._router.navigate([''])
  }

  getResults() {
    return console.log("Solicitamos los resultados al backend!")
  }

}
