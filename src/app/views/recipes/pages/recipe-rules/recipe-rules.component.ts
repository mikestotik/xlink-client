import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { filter, map, Observable, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { RuleAction } from '../../../../interfaces/action.interface';
import { Recipe } from '../../../../interfaces/recipe.interface';
import { Rule } from '../../../../interfaces/rule.interface';
import { Step } from '../../../../interfaces/step.interface';
import { Trigger } from '../../../../interfaces/trigger.interface';
import { ActionState } from '../../../../models/action/store/action.state';
import { RecipeState } from '../../../../models/recipe/store/recipe.state';
import { RuleActions } from '../../../../models/rule/store/rule.actions';
import { RuleState } from '../../../../models/rule/store/rule.state';
import { StepActions } from '../../../../models/step/store/step.actions';
import { StepState } from '../../../../models/step/store/step.state';
import { TriggerActions } from '../../../../models/trigger/store/trigger.actions';
import { TriggerState } from '../../../../models/trigger/store/trigger.state';
import { SortUtils } from '../../../../utils/sort.utils';
import { RecipeActionComponent } from '../../dialogs/recipe-action/recipe-action.component';
import { RecipeRuleComponent } from '../../dialogs/recipe-rule/recipe-rule.component';
import { RecipeStepComponent } from '../../dialogs/recipe-step/recipe-step.component';
import { RecipeTriggerComponent } from '../../dialogs/recipe-trigger/recipe-trigger.component';


@Component({
  templateUrl: './recipe-rules.component.html',
  styleUrls: [ './recipe-rules.component.scss' ]
})
export class RecipeRulesComponent implements OnInit, OnDestroy {

  @Select(RuleState.selectByStep)
  public stepRules$!: Observable<(stepId: number) => Rule[]>;


  @Select(TriggerState.selectByRule)
  public ruleTriggers$!: Observable<(ruleId: number) => Trigger[]>;

  @Select(ActionState.selectByRule)
  public ruleActions$!: Observable<(ruleId: number) => RuleAction[]>;

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
      map(steps => steps.sort(SortUtils.byOrder)),
      takeUntil(this.destroy$)
    )
      .subscribe(steps => this.steps = steps);
  }


  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  public onAddStep(): void {
    this.dialog.open(RecipeStepComponent, {
      data: {
        recipe: this.recipe.id
      }
    });
  }


  public onEditStep(step: Step): void {
    this.dialog.open(RecipeStepComponent, { data: step });
  }


  public onSwitchStep(step: Step): void {
    this.store.dispatch(new StepActions.Update(step.id, {
      disabled: !step.disabled
    }));
  }


  public onAddRule(step: Step): void {
    this.dialog.open(RecipeRuleComponent, {
      data: {
        step: step.id
      }
    });
  }


  public onEditRule(rule: Rule): void {
    this.dialog.open(RecipeRuleComponent, {
      data: rule
    });
  }


  public onSwitchRule(rule: Rule): void {
    this.store.dispatch(new RuleActions.Update(rule.id, {
      disabled: !rule.disabled
    }));
  }


  public onAddTrigger(rule: Rule): void {
    this.store.dispatch(new TriggerActions.Create({
      title: 'New Trigger',
      rule: rule.id
    }))
      .pipe(
        switchMap(() => this.store.selectOnce(TriggerState.selectJustCreated))
      )
      .subscribe(data => this.dialog.open(RecipeTriggerComponent, { data }));
  }


  public onEditTrigger(trigger: Trigger): void {
    this.dialog.open(RecipeTriggerComponent, {
      data: trigger
    });
  }


  public onAddAction(rule: Rule): void {
    this.dialog.open(RecipeActionComponent, {
      data: {
        rule: rule.id,
        payload: { do: 'something' }
      }
    });
  }


  public onEditAction(action: RuleAction): void {
    this.dialog.open(RecipeActionComponent, {
      data: action
    });
  }
}
