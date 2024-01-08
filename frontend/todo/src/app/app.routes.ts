import { Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { TodoBoardComponent } from './todo/todo-board/todo-board.component';

export const routes: Routes = [
    {
        path: '', component: HomeComponent
    },
    {
        path: 'user/register', component: RegisterComponent 
    },
    {
        path: 'user/login', component: LoginComponent
    },
    {
        path: 'todo-board', component: TodoBoardComponent
    }
];
