import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private apiUrl = 'http://localhost:3000/recipes';

  constructor(private http: HttpClient) { }

  saveRecipe(recipeData: any) {
    return this.http.post(this.apiUrl, recipeData);
  }

  getRecipes(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  getRecipe(id: string): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/${id}`);
  }

  updateRecipe(id: string, recipe: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, recipe);
  }

  deleteRecipe(id: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${id}`);
  }

}
