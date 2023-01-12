import { Routes } from '@angular/router';
import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';

export const RecipesRoutes: Routes = [
  {
    path: '',
    component: RecipeListComponent
  }
];
