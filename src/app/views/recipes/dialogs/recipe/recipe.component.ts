import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { Store } from '@ngxs/store';
import { Recipe, RecipePayload } from 'src/app/interfaces/recipe.interface';
import { RecipeActions } from 'src/app/models/recipe/store/recipe.actions';
import { AppRoutes, MainRoutes } from '../../../../config/routes.config';


interface Form {
  title: FormControl<string>;
  desc: FormControl<string | undefined>;
}


@Component({
  templateUrl: './recipe.component.html',
  styleUrls: [ './recipe.component.scss' ]
})
export class RecipeComponent {

  public form!: FormGroup<Form>;
  public formSent!: boolean;


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly entity: Recipe,
    private readonly dialogRef: MatDialogRef<RecipeComponent>,
    private readonly fb: FormBuilder,
    private readonly router: Router,
    private readonly store: Store) {

    this.form = this.createForm(entity);
  }


  public onClose(result?: boolean): void {
    this.dialogRef.close(result);
  }


  public onSubmit(): void {
    this.formSent = true;
    const value = this.form.value as RecipePayload;
    const action = this.entity ? new RecipeActions.Update(this.entity.id, value) : new RecipeActions.Create(value);

    this.store.dispatch(action).subscribe(() => {
      this.formSent = false;
      this.onClose(true);
    });
  }


  public onDelete(): void {
    this.formSent = true;
    this.store.dispatch(new RecipeActions.Delete(this.entity.id)).subscribe(() => {
      this.formSent = false;
      this.router.navigate([ AppRoutes.App, MainRoutes.Recipes ]);
      this.onClose(true);
    });
  }


  private createForm(recipe?: Recipe): FormGroup<Form> {
    return this.fb.nonNullable.group({
      title: [ recipe ? recipe.title : '', [ Validators.required ] ],
      desc: [ recipe ? recipe.desc : '' ]
    });
  }
}
