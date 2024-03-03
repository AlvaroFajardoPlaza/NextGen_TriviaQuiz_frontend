import { Injectable } from '@angular/core';
import {
	HttpRequest,
	HttpHandler,
	HttpEvent,
	HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
	constructor() {}

	intercept(
		request: HttpRequest<unknown>,
		next: HttpHandler
	): Observable<HttpEvent<unknown>> {
		// 1. Si voy a modificar la petición, primero la clono, y después envío esa copia/clon de la petición

		let cloneRequest = request;

		// 2. Si en localStorage tenemos token, estamos loggeados y tenemos que adjuntarlo a nuestro clon de request
		if (localStorage.getItem('token')) {
			cloneRequest = request.clone({
				setHeaders: {
					Authorization: localStorage.getItem('token')! // La exlamación indica que el valor no puede ser nulo.
				}
			});
		}

		return next.handle(cloneRequest);
	}
}
