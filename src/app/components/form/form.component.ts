// src/app/recipe-form/recipe-form.component.ts
import { Component, OnInit } from '@angular/core';
import { ReactiveFormsModule, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RecipeService } from '../../services/recipe.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs/operators'

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss'
})
export class RecipeFormComponent implements OnInit {
  recipeForm: FormGroup;
  categories = ['Entrée', 'Plat principal', 'Dessert', 'Apéritif', 'Boisson'];
  isEditMode = false;
  currentRecipeId: string | null = null;
    
  constructor(
    private fb: FormBuilder,
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) {
    this.recipeForm = this.fb.group({
      name: ['', Validators.required],
      ingredients: ['', Validators.required],
      steps: ['', Validators.required],
      photoFilename: [''],
      category: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.isEditMode = true;
          this.currentRecipeId = id;
          return this.recipeService.getRecipe(id);
        }
        return [null];
      })
    ).subscribe({
      next: (recipe) => {
        if (recipe) {
          this.populateForm(recipe);
        }
      },
      error: (err) => {
        console.error('Error loading recipe:', err);
      }
    });
  }

  populateForm(recipe: any): void {
    this.recipeForm.patchValue({
      name: recipe.name,
      ingredients: recipe.ingredients?.join('\n') || '',
      steps: recipe.steps?.join('\n') || '',
      photoFilename: recipe.imageUrl || '',
      category: recipe.category || ''
    });
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length > 0) {
      const file = input.files[0];
      this.recipeForm.patchValue({
        photoFilename: file.name
      });
    }
  }

  onSubmit(): void {
    if (this.recipeForm.valid) {
      const recipeData = {
        name: this.recipeForm.value.name,
        ingredients: this.recipeForm.value.ingredients.split('\n'),
        steps: this.recipeForm.value.steps.split('\n'),
        imageUrl: this.recipeForm.value.photoFilename,
        category: this.recipeForm.value.category
      };

      const saveOperation = this.isEditMode && this.currentRecipeId
        ? this.recipeService.updateRecipe(this.currentRecipeId, recipeData)
        : this.recipeService.saveRecipe(recipeData);

      saveOperation.subscribe({
        next: () => {
          alert(`Recette ${this.isEditMode ? 'modifiée' : 'enregistrée'} avec succès!`);
          this.router.navigate(['/recipes']);
        },
        error: (err) => alert('Erreur: ' + err.message)
      });
    }
  }
}