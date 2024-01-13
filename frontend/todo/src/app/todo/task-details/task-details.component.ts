import { Component } from '@angular/core';
import { CrudService } from '../../services/crud.service';
import { ActivatedRoute } from '@angular/router';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-task-details',
  standalone: true,
  imports: [
    MatCardModule
  ],
  templateUrl: './task-details.component.html',
  styleUrl: './task-details.component.css'
})
export class TaskDetailsComponent {
  task_id: any
  task_details: any

  constructor(
    private crudService: CrudService,
    private activateRoute: ActivatedRoute
  ) {
    this.activateRoute.params.subscribe((data:any) => {
      this.task_id = data.task_id
      if (this.task_id) {
        this.getTaskDetails(this.task_id)

      }
    })
    console.log(this.task_id)
  }

  getTaskDetails(task_id:any) {

    this.crudService.getAllData(`tasks/${task_id}`).subscribe((data:any) => {
      this.task_details = data
    })
  }
}
