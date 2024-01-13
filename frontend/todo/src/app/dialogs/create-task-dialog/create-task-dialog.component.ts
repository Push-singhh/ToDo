import { Component, Inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogTitle } from '@angular/material/dialog';
import { CrudService } from '../../services/crud.service';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-create-task-dialog',
  standalone: true,
  imports: [
    MatCardModule, ReactiveFormsModule, MatFormFieldModule, MatDialogActions, MatDialogClose,
    MatInputModule, MatButtonModule, MatDialogContent, MatDialogTitle
  ],
  templateUrl: './create-task-dialog.component.html',
  styleUrl: './create-task-dialog.component.css'
})
export class CreateTaskDialogComponent {
  taskForm:any=FormGroup

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.taskForm = this.fb.group({
      task: ['', Validators.required]
    })
  }

  submit() {
    this.crudService.postData('tasks/', {
      task: this.taskForm.get('task').value,
      category: this.data?.category
    }).subscribe((data:any) => {

    })
  }
}
