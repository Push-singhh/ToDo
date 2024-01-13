import { Component } from '@angular/core';
import { MatSidenavModule } from '@angular/material/sidenav'
import { CategoriesComponent } from '../categories/categories.component';
import { TasksComponent } from "../tasks/tasks.component";
import { TaskDetailsComponent } from '../task-details/task-details.component';

@Component({
    selector: 'app-todo-board',
    standalone: true,
    templateUrl: './todo-board.component.html',
    styleUrl: './todo-board.component.css',
    imports: [
        MatSidenavModule,
        CategoriesComponent,
        TasksComponent,
        TaskDetailsComponent
    ]
})
export class TodoBoardComponent {

}
