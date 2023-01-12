import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Subject, takeUntil } from 'rxjs';
import { Recipe } from 'src/app/interfaces/recipe.interface';
import { RecipeState } from 'src/app/models/recipe/store/recipe.state';
import { RecipeDetailsComponent } from '../../dialogs/recipe-details/recipe-details.component';

@Component({
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.scss']
})
export class RecipeListComponent implements OnInit, OnDestroy {

  public recipes!: Recipe[];
  public columns: string[] = ['id', 'title', 'desc', 'created', 'updated'];

  private destroy$ = new Subject<void>();

  constructor(
    private readonly store: Store,
    private readonly dialog: MatDialog) {
  }


  public ngOnInit(): void {
    this.store.select(RecipeState.selectAll).pipe(
      takeUntil(this.destroy$)
    )
      .subscribe(recipes => this.recipes = recipes);
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
