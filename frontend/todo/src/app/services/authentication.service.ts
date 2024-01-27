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

  register(userData:any): void {
    localStorage.setItem("token", userData.token)
      localStorage.setItem("email", userData.email)
      localStorage.setItem("name", userData.name)
      localStorage.setItem("user_id", userData.user_id)
      this.router.navigate(['/todo-board'])
  }

  login(userData:any): void {  
      localStorage.setItem("token", userData.token)
      localStorage.setItem("email", userData.email)
      localStorage.setItem("name", userData.name)
      localStorage.setItem("user_id", userData.user_id)
      this.router.navigate(['/todo-board'])
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
