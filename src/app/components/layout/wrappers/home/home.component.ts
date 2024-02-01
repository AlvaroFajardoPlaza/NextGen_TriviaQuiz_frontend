import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { MyTriviaService } from 'src/app/components/trivia/my-trivia.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private __router = inject(Router);
  private __trivisSvc = inject(MyTriviaService)

  categories$: Observable<Array<any>> = this.__trivisSvc.getCategories()

  // Redirecciones de los botones
  goToRandomTrivia() {
    this.__router.navigate(['trivia']);
  }
}
