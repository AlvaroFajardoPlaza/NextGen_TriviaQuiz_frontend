import { Component, OnInit, inject } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { TriviaElement } from 'src/app/data/models/TriviaElement.interface';
import { MyTriviaService } from '../my-trivia.service';
import { Router } from '@angular/router';



@Component({
  selector: 'app-trivia',
  templateUrl: './trivia.component.html',
  styleUrls: ['./trivia.component.scss']
})
export class TriviaComponent implements OnInit{
  private _triviaSvc = inject(MyTriviaService)
  private _router = inject(Router)

  triviaTest$: Observable<Array<any>> = this._triviaSvc.getRandomTrivia();
  randomTest: Array<TriviaElement> = [];
  subscription: Subscription | undefined // La subscripcción nos es útil para manejar el ciclo de vida del componente

  ngOnInit(): void {
    console.log("renderizamos el componente trivia")
  }

  navigateHome() {
    return this._router.navigate([''])
  }

  getResults() {
    return console.log("Solicitamos los resultados al backend!")
  }

}
