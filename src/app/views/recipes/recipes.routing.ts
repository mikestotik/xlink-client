import { Routes } from '@angular/router';
import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';
import { RecipeRulesComponent } from './pages/recipe-rules/recipe-rules.component';


export const RecipesRoutes: Routes = [
  {
    path: '',
    component: RecipeListComponent,
    children: [
      {
        path: ':id',
        component: RecipeRulesComponent
      }
    ]
  }
];
