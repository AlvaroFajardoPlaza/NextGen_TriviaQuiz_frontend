import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/components/auth/auth.service';
import { MyTriviaService } from 'src/app/components/trivia/my-trivia.service';
import { User } from 'src/app/data/models/User';

@Component({
	selector: 'app-nav',
	templateUrl: './nav.component.html',
	styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
	private _router = inject(Router);

	// Traemos nuestras llamadas a los servicios
	private __authSvc = inject(AuthService);

	x: any;

	registeredUser$: Observable<User> = this.__authSvc.User$;
	token$: Observable<string> = this.__authSvc.token$;

	ngOnInit(): void {
		// Tenemos un usuario loggeado? Nos subscribimos al observable
		this.registeredUser$.subscribe((user) => {
			console.log('El usuario está loggeado?', user);
		});
	}

	myFunction() {
		this.x = document.getElementById('nav_bar');
		if (this.x.className === 'topnav') {
			this.x.className += ' responsive';
		} else {
			this.x.className = 'topnav';
		}
	}

	// Redirecciones desde el NavBar
	goToHomepage() {
		return this._router.navigate(['']);
	}

	navigateToRegister() {
		return this._router.navigate(['auth']);
	}

	// Esta ruta va estar restringida
	goToPoll() {
		return this._router.navigate(['poll']);
	}

	LogOutUser() {
		const response = this.__authSvc.log_out();
		return response;
	}
}
