import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import { LoginForm } from 'src/app/data/models/LoginForm.interface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  private _router = inject(Router)
  private _formBuilder = inject(FormBuilder)
  private _AuthSvc = inject(AuthService)
  
  loginForm: FormGroup | LoginForm | any

  constructor () {
    this.initializeForm()
  };

  initializeForm() {
    this.loginForm = this._formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  async onSubmit() {
    const response = await this._AuthSvc.login(
      this.loginForm.value
    )
    console.log("Nuestra respuesta al login: ", response)
    // this._router.navigate([''])
  }

}
