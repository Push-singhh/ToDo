import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators, } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatInputModule } from '@angular/material/input';
import { CrudService } from '../../services/crud.service';
import { MatDialogActions, MatDialogClose, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-create-category-dialog',
  standalone: true,
  imports: [
    MatCardModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatDialogActions,
    MatDialogClose,
    ReactiveFormsModule
  ],
  templateUrl: './create-category-dialog.component.html',
  styleUrl: './create-category-dialog.component.css'
})
export class CreateCategoryDialogComponent {
  categoryForm:any

  constructor(
    private fb: FormBuilder,
    private crudService: CrudService
  ) {}

  ngOnInit() {
    this.categoryForm = this.fb.group({
      title : ['', Validators.required]
    })
  }

  submit() {
    this.crudService.postData("categories/", {
      title: this.categoryForm.get("title").value
    }).subscribe((data: any) => {

    })
  }
}
