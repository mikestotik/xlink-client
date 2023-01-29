import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
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
import { RecipeComponent } from './dialogs/recipe/recipe.component';
import { RecipeRuleTriggerComponent } from './dialogs/recipe-rule-trigger/recipe-rule-trigger.component';
import { RecipeRuleComponent } from './dialogs/recipe-rule/recipe-rule.component';
import { RecipeStepComponent } from './dialogs/recipe-step/recipe-step.component';
import { RecipeListComponent } from './pages/recipe-list/recipe-list.component';
import { RecipeRulesComponent } from './pages/recipe-rules/recipe-rules.component';
import { StepStatusPipe } from './pipes/step-status.pipe';
import { RecipesRoutes } from './recipes.routing';


@NgModule({
  declarations: [
    RecipeListComponent,
    RecipeComponent,
    RecipeRulesComponent,
    RecipeStepComponent,
    StepStatusPipe,
    RecipeRuleComponent,
    RecipeRuleTriggerComponent
  ],
  exports: [
    RecipeComponent
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
    MatTableModule,
    MatAutocompleteModule
  ]
})
export class RecipesModule {}
