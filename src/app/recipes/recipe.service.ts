import { Injectable } from '@angular/core';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
  //
  // private recipes: Recipe[] = [
  //   new Recipe(
  //     'Osh Palov',
  //     'A super-tasty Palov - just awesome!',
  //     'https://makepedia.uz/wp-content/uploads/2018/09/osh-tayyorlash.jpg',
  //     [
  //       new Ingredient('Meat', 1),
  //       new Ingredient('Carrot', 12),
  //       new Ingredient('Onion', 2),
  //       new Ingredient('Oil', 1),
  //       new Ingredient('Spices', 1),
  //     ]),
  //   new Recipe('Chuchvara',
  //     'Uzbek cuisine. What else you need to say?',
  //     'https://makepedia.uz/wp-content/uploads/2020/04/chuchvara.jpg',
  //     [
  //       new Ingredient('Potatoes', 2),
  //       new Ingredient('Meat', 1),
  //       new Ingredient('Flour', 1),
  //       new Ingredient('Egg', 2),
  //       new Ingredient('Onion', 3),
  //     ])
  // ]

  private recipes: Recipe[] = [];

  constructor(private slService: ShoppingListService) {}

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice())
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.slService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }
}
