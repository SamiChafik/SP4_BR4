import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RecipeFormComponent } from './components/form/form.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './guard/auth.guard';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'add', component: RecipeFormComponent, canActivate:[AuthGuard]},
    { path: 'recipes', component: RecipeListComponent},
    { path: 'edit/:id', component: RecipeFormComponent, canActivate:[AuthGuard]},
    { path: 'login', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: '**', redirectTo: '' }
];
