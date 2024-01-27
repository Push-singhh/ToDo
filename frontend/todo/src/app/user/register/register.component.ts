import { Component } from '@angular/core'
import { ReactiveFormsModule, Validators, FormBuilder, FormGroup } from '@angular/forms'
import { MatCardModule } from '@angular/material/card';
import { AuthenticationService } from '../../services/authentication.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { Route, Router } from '@angular/router';
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm: any; // because FormGroup can't be assigned null and we will initialize this form
  // in constructor we are telling typescript that form will hav value but later

  registrationErrors = []

  constructor(
    private authentiactionService: AuthenticationService,
    private crudService: CrudService,
    private formBuilder: FormBuilder,
    public router: Router
    ) {}


  ngOnInit(){
    this.registerForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      password2: ['', Validators.required],
    })
  }

  submit(){
    this.registerForm.markAllAsTouched()
    if (!this.registerForm.valid){return}

    this.crudService.postData("users/register", {
      name: this.registerForm.get('name').value,
      email: this.registerForm.get('email').value,
      password: this.registerForm.get('password').value,
      password2: this.registerForm.get('password2').value,
    }).subscribe((response: any) => {
      this.authentiactionService.register(response)
      
    }, err => {
      const validationErrors = err.error;
      if ('non_field_errors' in validationErrors) {
        this.registrationErrors = validationErrors
      }
      else {
        Object.keys(validationErrors).forEach(field => {
          if (this.registerForm.get(field)){
            this.registerForm.get(field).setErrors({
              serverError: validationErrors[field]
            })
          }
        })
      }
    })
    
  }
}
