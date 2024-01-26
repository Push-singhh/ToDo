import { Routes } from '@angular/router';
import { RegisterComponent } from './user/register/register.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './user/login/login.component';
import { TodoBoardComponent } from './todo/todo-board/todo-board.component';
import { authGuard } from './helpers/auth.guard';

export const routes: Routes = [
    {
        path: '', component: HomeComponent,
        canActivate: [authGuard]
    },
    {
        path: 'register', component: RegisterComponent 
    },
    {
        path: 'login', component: LoginComponent
    },
    {
        path: 'todo-board', component: TodoBoardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'todo-board/category/:id', component: TodoBoardComponent,
        canActivate: [authGuard]
    },
    {
        path: 'todo-board/category/:id/task/:task_id', component: TodoBoardComponent,
        canActivate: [authGuard]
    }

];
