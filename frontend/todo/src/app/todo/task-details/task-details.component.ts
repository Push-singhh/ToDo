import { Component, OnDestroy } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { DatePipe } from '@angular/common';
import { CommunicationService } from '../../services/communication.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    MatCardModule, MatIconModule, MatButtonModule, DatePipe
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent implements OnDestroy {
  task_id: any
  task_details: any

  subscription = new Subscription()

  constructor(
    private crudService: CrudService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private communicationService: CommunicationService
  ) {
    this.subscription = communicationService.updateTaskDetailAnnounced$.subscribe(update => {
      if (update) {
        if(this.task_id){
          this.getTaskDetails()

        }
      }
    })
    this.activateRoute.params.subscribe((data:any) => {
      this.task_id = data.task_id
      if (this.task_id) {
        this.getTaskDetails()

      }
    })
  }

  getTaskDetails() {

    this.crudService.getAllData(`tasks/${this.task_id}`).subscribe((data:any) => {
      this.task_details = data
    })
  }

  deleteTask() {
    this.crudService.deleteData(`tasks/${this.task_id}/delete`).subscribe((data:any) => {
      this.router.navigate([`/todo-board/category/${this.task_details.category}`])
    })
  }

  ngOnDestroy() {
    this.subscription.unsubscribe()
  }
}
