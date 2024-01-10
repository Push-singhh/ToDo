import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CrudService } from '../../services/crud.service';
import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag} from '@angular/cdk/drag-drop'

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    MatButtonModule, CdkDropList, CdkDrag
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.css'
})
export class CategoriesComponent {
  user: any = {}
  categories: any = []

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private crudService: CrudService
  ) {
    this.user['email'] = localStorage.getItem("email")
    this.user['name'] = localStorage.getItem("name")
    this.user['user_id'] = localStorage.getItem("user_id")
    
  }

  ngOnInit() {
    this.get_categories()
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
  }

  submit() {
    this.router.navigate(['/user/login']);
  }

  logout() {
    this.authenticationService.logout()
  }

  get_categories () {
    this.crudService.getAllData("categories/").subscribe((data: any) => {
      this.categories = data
    })
  }
}
