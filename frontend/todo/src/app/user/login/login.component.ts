import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AuthenticationService } from '../../services/authentication.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Router } from '@angular/router';
import { CrudService } from '../../services/crud.service';


@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatCardModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  loginForm:any;
  login_errors = []

  constructor(
    private crudService: CrudService,
    private authenticationService: AuthenticationService,
    private fb: FormBuilder,
    public router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  submit() {
    this.login_errors = []
    this.loginForm.markAllAsTouched()
    if (!this.loginForm.valid) {
      return
    }

    this.crudService.postData("users/auth/login", {
      username: this.loginForm.get("username").value,
      password: this.loginForm.get("password").value
    }).subscribe((response: any) => {
      this.authenticationService.login(response)
    }, error => {

      const validationErrors = error.error;
      if ('non_field_errors' in validationErrors) {
        this.login_errors = validationErrors['non_field_errors']
      }
      else {
        Object.keys(validationErrors).forEach(field => {
          const formControl = this.loginForm.get(field);
          if (formControl) {
            formControl.setErrors({
              serverError: validationErrors[field]
            });
          }  
        });

      }  
      

      
    }) 
  }
}
