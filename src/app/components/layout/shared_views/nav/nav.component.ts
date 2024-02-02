import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {
  private _router = inject(Router)

  x: any

  myFunction() {
    this.x = document.getElementById("nav_bar");
    if (this.x.className === "topnav") {
      this.x.className += " responsive";
    } else {
      this.x.className = "topnav";
    }
  }


  // Redirecciones desde el NavBar
  goToHomepage (){
    this._router.navigate(['']);
  }

  // goToRandomTrivia() {
  //   this._router.navigate(['trivia'])
  // }

  navigateToRegister() {
    this._router.navigate(['auth']);
  }

}
