import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { Select, Store } from '@ngxs/store';
import { Observable, Subject, takeUntil } from 'rxjs';
import { Recipe } from 'src/app/interfaces/recipe.interface';
import { RecipeState } from 'src/app/models/recipe/store/recipe.state';
import { routerNavigationEnd } from '../../../../utils/router.utils';
import { RecipeDetailsComponent } from '../../dialogs/recipe-details/recipe-details.component';


@Component({
  templateUrl: './recipe-list.component.html',
  styleUrls: [ './recipe-list.component.scss' ]
})
export class RecipeListComponent implements OnInit, OnDestroy {

  @Select(RecipeState.selectAll)
  public recipes$!: Observable<Recipe[]>;
  public selected!: boolean;

  private destroy$ = new Subject<void>();


  constructor(
    private readonly router: Router,
    private readonly routes: ActivatedRoute,
    private readonly store: Store,
    private readonly dialog: MatDialog) {
  }


  public ngOnInit(): void {
    this.selected = !!this.routes.children.length;

    routerNavigationEnd(this.router).pipe(
      takeUntil(this.destroy$)
    ).subscribe(
      () => this.selected = !!this.routes.children.length
    );
  }


  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  public onAdd(): void {
    this.dialog.open(RecipeDetailsComponent);
  }


  public onEdit(recipe: Recipe): void {
    this.dialog.open(RecipeDetailsComponent, { data: recipe });
  }
}
