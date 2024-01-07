import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private crudService: CrudService
  ) {

   }

  register(data:any): void {
    this.crudService.postData("users/register", data).subscribe((response: any) => {
      localStorage.setItem("token", response.token)
    })
  }

  login(email: string, password: string): void {
    this.crudService.postData("users/auth/login", {
      username: email,
      password: password
    }).subscribe((response: any) => {
      localStorage.setItem("token", response.token)
    }) 
  }
}
