import { Component, inject } from '@angular/core';
import { Form, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {

  private _router = inject(Router)
  private _formbuilder = inject(FormBuilder)
  private  _AuthSvc = inject(AuthService)

  registerForm: FormGroup | any 

  constructor() {
    this.initializeForm()
  };

  initializeForm() {
    this.registerForm = this._formbuilder.group({
      username: ['', 
        [ 
          Validators.required, 
          Validators.minLength(4), 
          Validators.maxLength(18)
        ]
      ],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  async onSubmit() {
    const response = await this._AuthSvc.register(
      this.registerForm.value
    );
    console.log("Nuestra respuesta al register: ", response)
    
    // Una vez que nos hemos registrado, podemos volver a la home
    await this._router.navigate([''])
  }
}
