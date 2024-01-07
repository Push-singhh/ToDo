import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card'
import { MatInputModule } from '@angular/material/input';



@NgModule({
  declarations: [
    MatCardModule
  ],
  imports: [
    CommonModule,
    MatCardModule
  ]
})
export class UserModule { }
