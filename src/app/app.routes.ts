import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RecipeFormComponent } from './components/form/form.component';
import { RecipeListComponent } from './components/recipe-list/recipe-list.component';

export const routes: Routes = [
    { path: '', component: HomeComponent},
    { path: 'login', component: LoginComponent},
    { path: 'add', component: RecipeFormComponent},
    { path: 'recipes', component: RecipeListComponent},
    { path: 'edit/:id', component: RecipeFormComponent},
    { path: '**', redirectTo: '' }
];
