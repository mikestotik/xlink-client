import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';

import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RecipeDetailsComponent } from './dialogs/recipe-details/recipe-details.component';
import { RecipeStepDetailsComponent } from './dialogs/recipe-step-details/recipe-step-details.component';
import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';
import { RecipeWorkspaceComponent } from './pages/recipe-workspace/recipe-workspace.component';
import { RecipesRoutes } from './recipes.routing';
import { StepStatusPipe } from './pipes/step-status.pipe';


@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeDetailsComponent,
    RecipeWorkspaceComponent,
    RecipeStepDetailsComponent,
    StepStatusPipe
  ],
  exports: [
    RecipeDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(RecipesRoutes),
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatMenuModule,
    MatTableModule
  ]
})
export class RecipesModule {}
