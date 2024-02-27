import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import {
	BehaviorSubject,
	Observable,
	firstValueFrom,
	switchMap,
	tap
} from 'rxjs';
import { LoginForm } from 'src/app/data/models/LoginForm';
import { LoginResponse } from 'src/app/data/models/LoginResponse';
import { RegisterForm } from 'src/app/data/models/RegisterForm';
import { environment } from 'src/app/environments/environment';

@Injectable({
	providedIn: 'root'
})

// Dentro de este componente vamos a manejar el registro, login, logout y otros servicios relacionados a los usuarios.
export class AuthService {
	private _router = inject(Router);
	private _http = inject(HttpClient);

	// Creamos nuestro New Behaviour Subject --> token
	token$ = new BehaviorSubject<string>(localStorage.getItem('token') || '');

	// Creamos nuestro Observable de usuario loggeado y autenticado
	User$: Observable<any> = this.token$.pipe(
		switchMap((token) => (!token ? '' : this.me()))
	);

	getAllUsers() {
		return this._http.get(`${environment.baseUrl}/users`);
	}

	register(formValues: RegisterForm) {
		// console.log("Los valores que mandamos en el registro: ", formValues)
		return firstValueFrom(
			this._http
				.post<any>(`${environment.baseUrl}/register`, formValues)
				.pipe(
					tap((response) => {
						localStorage.setItem('token', response[1].token);
						this.token$.next(response.token);
					})
				)
		).catch((error: any) => {
			console.error('Error en la solicitud de registro:', error);
			throw error;
		});
	}

	login(formValues: LoginForm) {
		return firstValueFrom(
			this._http
				.post<LoginResponse>(`${environment.baseUrl}/login`, formValues)
				.pipe(
					tap((response) => {
						localStorage.setItem('token', response.token);
						this.token$.next(response.token);
					})
				)
		).catch((error: any) => {
			console.error('Error en la solicitud de login:', error.error);
			throw error;
		});
	}

	// La función me() hace una llamada al backend para cotejar la info que existe en el token y autenticar al usuario
	me(): Observable<any> {
		return this._http.post<any>(
			`${environment.baseUrl}/me`,
			// Le mandamos el token que tenemos alojado en el localStorage
			{
				token: localStorage.getItem('token')
			}
		);
	}

	log_out() {
		console.log('Log out del user');
		localStorage.removeItem('token');

		return this._router.navigate(['auth']);
	}
}
