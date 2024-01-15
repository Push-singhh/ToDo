import { Component } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { CrudService } from '../../services/crud.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../../dialogs/create-task-dialog/create-task-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CdkDropList, CdkDrag, MatButtonModule
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
  tasks:any = []
  category_id!:number
  selectedTaskId!:number

  constructor(
    private crudService: CrudService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.params.subscribe((data:any) => {
      this.category_id = data.id
      this.selectedTaskId = data.task_id
      if(this.category_id) {
        this.getTasks(this.category_id)
      }
    })
  }

  getTasks(category_id: number) {
    this.crudService.getAllData(`tasks/?category_id=${category_id}`).subscribe((data:any) => {
      this.tasks = data
    })
  }

  taskDetails(task_id:number) {
    this.selectedTaskId = task_id
    this.router.navigate(['/todo-board/category', this.category_id, 'task', task_id])
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);

    this.crudService.updateData(`tasks/${this.tasks[event.currentIndex].id}/update`, {
      position: event.currentIndex + 1
    }).subscribe((response:any) => {

    })
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '300px',
      data: {
        category: this.category_id
      }
      
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTasks(this.category_id)
    });
  }

}
