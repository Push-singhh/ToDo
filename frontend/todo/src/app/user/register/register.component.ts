import { Component } from '@angular/core'
import { FormGroup, FormControl, Validators } from '@angular/forms'
import { CrudService } from '../../services/crud.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm!: FormGroup; // because FormGroup can't be assigned null and we will initialize this form
  // in constructor we are telling typescript that form will hav value but later

  constructor(private crud_service: CrudService) {}


  ngOnInit(){
    this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
    })
  }

  submit(){
    this.crud_service.postData('users/register', {"name": "pushpraj"}).subscribe((value:any) => {
      console.log("hi")
    })
  }
}
