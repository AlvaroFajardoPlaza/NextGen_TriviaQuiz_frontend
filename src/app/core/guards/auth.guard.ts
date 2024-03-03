import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
	if (tokenExists()) {
		// El usuario puede avanzar por la ruta
		return true;
	} else {
		let _router = inject(Router);
		// El usuario no está loggeado y tiene que crear una cuenta.
		alert(
			'You have no permission to access. You need to create a user account.'
		);
		return _router.navigate(['auth']);
	}

	// Función que verifica si existe un token en nuestro localStorage
	function tokenExists(): boolean {
		let userToken: string | any = localStorage.getItem('token' || null);
		if (!userToken) {
			return false;
		} else {
			return true;
		}
	}
};
