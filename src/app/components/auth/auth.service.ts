import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { LoginForm } from 'src/app/data/models/LoginForm.interface';
import { RegisterForm } from 'src/app/data/models/RegisterForm.interface';
import { environment } from 'src/app/environments/environment';

@Injectable({
  providedIn: 'root'
})

// Dentro de este componente vamos a manejar el registro, login, logout y otros servicios relacionados a los usuarios.
export class AuthService {
  private _http = inject(HttpClient)

  register(formValues: RegisterForm) {
    // console.log("Los valores que mandamos en el registro: ", formValues)
    return firstValueFrom(
      this._http.post<RegisterForm>(`${environment.baseUrl}/register`, formValues)
    ).catch((error: any) => {
      console.error('Error en la solicitud de registro:', error);
      throw error;
    });
  };


  login(formValues: LoginForm) {
    return firstValueFrom(
      this._http.post<LoginForm>(`${environment.baseUrl}/login`, formValues)
    ).catch((error: any) => {
      console.error('Error en la solicitud de login:', error.error);
      throw error;
    });
  };


  log_out() {
    console.log("Log out del user")
  }
}
