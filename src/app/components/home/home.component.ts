import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../../services/recipe.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  private router = inject(Router);

  recipes: any[] = [];
  defaultImage = 'assets/logo_color.png';

  constructor(private recipeService: RecipeService) { }

  ngOnInit(): void {
    this.recipeService.getRecipes().subscribe(data => {
      this.recipes = data;
    });
  }

  getImageUrl(imageName: string | undefined): string {
    if (!imageName) return this.defaultImage;
    return `assets/${imageName}`;
  }

  getLastFourRecipes(): any[] {
    return [...this.recipes]
      .sort((a, b) => b.id - a.id)
      .slice(0, 4);
  }

  GoToRecipes() {
    this.router.navigate(['recipes']);
  }

}
