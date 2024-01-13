import { Component } from '@angular/core';
import { CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray } from '@angular/cdk/drag-drop';
import { CrudService } from '../../services/crud.service';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog } from '@angular/material/dialog';
import { CreateTaskDialogComponent } from '../../dialogs/create-task-dialog/create-task-dialog.component';

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

  constructor(
    private crudService: CrudService,
    private dialog: MatDialog
  ) {
    this.getTasks()
  }

  getTasks() {
    this.crudService.getAllData('tasks/').subscribe((data:any) => {
      this.tasks = data
    })
  }

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.tasks, event.previousIndex, event.currentIndex);
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateTaskDialogComponent, {
      width: '300px',
      
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getTasks()
    });
  }

}
