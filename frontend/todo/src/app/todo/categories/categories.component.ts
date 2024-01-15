import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CrudService } from '../../services/crud.service';
import { CdkDragDrop, moveItemInArray, CdkDropList, CdkDrag} from '@angular/cdk/drag-drop'
import { MatDialog } from '@angular/material/dialog'
import { CreateCategoryDialogComponent } from '../../dialogs/create-category-dialog/create-category-dialog.component';

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
  selectedCategory!: number 

  constructor(
    private router: Router,
    private authenticationService: AuthenticationService,
    private crudService: CrudService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute
  ) {
    this.user['email'] = localStorage.getItem("email")
    this.user['name'] = localStorage.getItem("name")
    this.user['user_id'] = localStorage.getItem("user_id")
    
    this.activatedRoute.params.subscribe((data:any) => {
      this.selectedCategory = data.id
    })
  }

  ngOnInit() {
    this.get_categories()
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.categories, event.previousIndex, event.currentIndex);
    this.crudService.updateData(`categories/${this.categories[event.currentIndex].id}/update`, {
      position: event.currentIndex + 1
    }).subscribe((response:any) => {

    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateCategoryDialogComponent, {
      width: '300px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      this.get_categories()
    });
  }

  openList(category_id:number) {
    this.selectedCategory = category_id
    this.router.navigate(['/todo-board/category/', category_id])
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
