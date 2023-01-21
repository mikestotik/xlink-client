import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { filter, map, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Recipe } from '../../../../interfaces/recipe.interface';
import { Rule } from '../../../../interfaces/rule.interface';
import { Step } from '../../../../interfaces/step.interface';
import { RecipeState } from '../../../../models/recipe/store/recipe.state';
import { RuleState } from '../../../../models/rule/store/rule.state';
import { StepActions } from '../../../../models/step/store/step.actions';
import { StepState } from '../../../../models/step/store/step.state';
import { RecipeCreateRuleComponent } from '../../dialogs/recipe-create-rule/recipe-create-rule.component';
import { RecipeStepDetailsComponent } from '../../dialogs/recipe-step-details/recipe-step-details.component';


@Component({
  templateUrl: './recipe-rules.component.html',
  styleUrls: [ './recipe-rules.component.scss' ]
})
export class RecipeRulesComponent implements OnInit, OnDestroy {

  @Select(RuleState.selectByStep)
  public stepRules$!: Observable<(stepId: number) => Rule[]>;

  public recipe!: Recipe;
  public steps!: Step[];

  private destroy$ = new Subject<void>();


  constructor(
    private router: Router,
    private readonly route: ActivatedRoute,
    private readonly store: Store,
    private readonly dialog: MatDialog) {
  }


  public ngOnInit(): void {
    this.route.url.pipe(
      map(() => this.route.snapshot.paramMap.get('id')),
      map(recipeId => Number(recipeId)),
      switchMap(recipeId => this.store.select(RecipeState.selectOne).pipe(
        map(filterFn => filterFn(recipeId))
      )),
      filter(recipe => !!recipe),
      tap(recipe => this.recipe = recipe),
      switchMap(recipe => this.store.select(StepState.selectByRecipe).pipe(
        map(filterFn => filterFn(recipe.id))
      )),
      map(steps => steps.sort(compareByOrder)),
      takeUntil(this.destroy$)
    )
      .subscribe(steps => this.steps = steps);
  }


  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  public onAddStep(): void {
    this.dialog.open(RecipeStepDetailsComponent, {
      data: {
        recipe: this.recipe.id
      }
    });
  }


  public onEditStep(step: Step): void {
    this.dialog.open(RecipeStepDetailsComponent, { data: step });
  }


  public onSwitchStep(step: Step): void {
    this.store.dispatch(new StepActions.Update(step.id, {
      disabled: !step.disabled
    }));
  }


  public onAddRule(step: Step): void {
    this.dialog.open(RecipeCreateRuleComponent, {
      data: {
        step: step.id
      }
    });
  }


  public onEditRule(rule: Rule): void {
    this.dialog.open(RecipeCreateRuleComponent, {
      data: rule
    });
  }
}


function compareByOrder(a: Step, b: Step) {
  if (a.order < b.order) {
    return -1;
  }
  if (a.order > b.order) {
    return 1;
  }
  return 0;
}
