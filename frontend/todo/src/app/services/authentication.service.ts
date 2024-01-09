import { Injectable } from '@angular/core';
import { CrudService } from './crud.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(
    private crudService: CrudService,
    private router: Router
  ) {

   }

  register(data:any): void {
    this.crudService.postData("users/register", data).subscribe((response: any) => {
      localStorage.setItem("token", response.token)
      localStorage.setItem("email", response.email)
      localStorage.setItem("name", response.name)
      localStorage.setItem("user_id", response.user_id)
      this.router.navigate(['/todo-board'])
    })
  }

  login(email: string, password: string): void {
    this.crudService.postData("users/auth/login", {
      username: email,
      password: password
    }).subscribe((response: any) => {
      localStorage.setItem("token", response.token)
      localStorage.setItem("email", response.email)
      localStorage.setItem("name", response.name)
      localStorage.setItem("user_id", response.user_id)
      this.router.navigate(['/todo-board'])
    }) 
  }

  logout(): void {
    localStorage.removeItem("token")
    localStorage.removeItem("email")
    localStorage.removeItem("name")
    localStorage.removeItem("user_id")
    this.router.navigate(['/'])
  }

  public isLoggedIn(): boolean {
    let token = localStorage.getItem("token");
    return token != null && token.length > 0;
  }

  public getToken(): string | null {
    return this.isLoggedIn() ? localStorage.getItem("token") : null;
  }
}
