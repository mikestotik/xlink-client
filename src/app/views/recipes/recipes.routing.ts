import { Routes } from '@angular/router';
import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';
import { RecipeWorkspaceComponent } from './pages/recipe-workspace/recipe-workspace.component';


export const RecipesRoutes: Routes = [
  {
    path: '',
    component: RecipeListComponent,
    children: [
      {
        path: ':id',
        component: RecipeWorkspaceComponent
      }
    ]
  }
];
