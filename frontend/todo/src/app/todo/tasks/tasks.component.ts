import { Component, OnDestroy } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { CrudService } from '../../services/crud.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../../dialogs/create-task-dialog/create-task-dialog.component';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon'
import { MatCheckbox, MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';
import { FormsModule } from '@angular/forms';
import { CommunicationService } from '../../services/communication.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    CdkDropList, CdkDrag, MatButtonModule, MatCardModule, MatButtonModule, MatIconModule, 
    MatCheckboxModule, MatRadioModule, FormsModule
  ],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent implements OnDestroy{
  tasks:any = []
  completedTasks: any = []
  selectedTaskId!:number
  category_id!:number
  category_details: any

  completed = false

  subscription = new Subscription()


  constructor(
    private crudService: CrudService,
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private communicationService: CommunicationService
  ) {
    this.subscription = communicationService.updateTaskListAnnounced$.subscribe(update => {
      this.getActiveTasks()
      this.getCompletedTasks()
    })
    this.activatedRoute.params.subscribe((data:any) => {
      this.category_id = data.id
      this.selectedTaskId = data.task_id
      if(this.category_id) {
        this.getActiveTasks()
        this.getCompletedTasks()
        this.getCategoryDetails()
      }
    })
  }

  getActiveTasks() {
    this.crudService.getAllData(`tasks/?category_id=${this.category_id}&completed=${false}`).subscribe((data:any) => {
      this.tasks = data
    })
  }

  getCompletedTasks() {
    this.crudService.getAllData(`tasks/?category_id=${this.category_id}&completed=${true}`).subscribe((data:any) => {
      this.completedTasks = data
    })
  }

  taskDetails(task_id:number) {
    this.selectedTaskId = task_id
    this.router.navigate(['/todo-board/category', this.category_id, 'task', task_id])
  }

  
  getCategoryDetails() {
    this.crudService.getAllData(`categories/${this.category_id}`).subscribe((data:any) => {
      this.category_details = data
    })
  }

  deleteCategory() {
    this.crudService.deleteData(`categories/${this.category_id}/delete`).subscribe((data: any) => {
      this.router.navigate(['/todo-board'])
    })
  }

  updateTaskCompletion(task_id: number, completed_at:any, event:any) {
    console.log(event)
    if (completed_at) {
      completed_at = new Date()
    }
    else {
      completed_at = null
    }
    this.crudService.updateData(`tasks/${task_id}/update`, {
      completed_at: completed_at
    }).subscribe((response:any) => {
        // this.communicationService.announceTaskDetailUpdate(true)
        // this.communicationService.announceCategoriesUpdate(true)
        this.getActiveTasks()
        this.getCompletedTasks()
    })
    event.stopPropagation();

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
      this.getActiveTasks()
    });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }

}
