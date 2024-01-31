import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  private __router = inject(Router);

  // Redirecciones de los botones
  goToRandomTrivia() {
    this.__router.navigate(['trivia']);
  }

}
