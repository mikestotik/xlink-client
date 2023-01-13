import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { map, Subject, switchMap, takeUntil, tap } from 'rxjs';
import { Step } from '../../../../interfaces/step.interface';
import { StepState } from '../../../../models/step/store/step.state';
import { RecipeStepDetailsComponent } from '../../dialogs/recipe-step-details/recipe-step-details.component';


@Component({
  templateUrl: './recipe-workspace.component.html',
  styleUrls: [ './recipe-workspace.component.scss' ]
})
export class RecipeWorkspaceComponent implements OnInit, OnDestroy {

  public steps!: Step[];

  private recipeId!: number;
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
      tap(recipeId => this.recipeId = recipeId),
      switchMap(recipeId => this.store.select(StepState.selectByRecipe).pipe(
        map(filterFn => filterFn(recipeId))
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
        recipe: this.recipeId
      }
    });
  }


  public onEditStep(step: Step): void {
    this.dialog.open(RecipeStepDetailsComponent, { data: step });
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
