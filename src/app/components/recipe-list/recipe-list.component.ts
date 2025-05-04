import { Component } from '@angular/core';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-recipe-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './recipe-list.component.html',
  styleUrl: './recipe-list.component.scss'
})
export class RecipeListComponent {

  recipes: any[] = [];
  defaultImage = 'assets/logo_color.png';
  selectedRecipe: any = null;

  constructor(
    private recipeService: RecipeService,
    private router: Router,
    public authService: AuthService
  ) { }
  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(data => {
      this.recipes = data;
    });
  }

  getImageUrl(imageName: string | undefined): string {
    if (!imageName) return this.defaultImage;
    return `assets/${imageName}`;
  }

  showRecipeDetails(recipe: any): void {
    this.selectedRecipe = recipe;
    document.body.style.overflow = 'hidden';
  }

  closeRecipeDetails(): void {
    this.selectedRecipe = null;
    document.body.style.overflow = '';
  }

  deleteRecipe(id: number): void {
    this.recipeService.deleteRecipe(id).subscribe(() => {
      this.recipes = this.recipes.filter(recipe => recipe.id !== id);
    });
  }

  editRecipe(id: string): void {
    this.router.navigate(['/edit', id]);
  }

}
