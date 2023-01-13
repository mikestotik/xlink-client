import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Recipe, RecipePayload } from 'src/app/interfaces/recipe.interface';
import { RecipeActions } from 'src/app/models/recipe/store/recipe.actions';

interface Form {
  title: FormControl<string>;
  desc: FormControl<string | undefined>;
}

@Component({
  templateUrl: './recipe-details.component.html',
  styleUrls: ['./recipe-details.component.scss']
})
export class RecipeDetailsComponent {

  public form!: FormGroup<Form>;
  public formSent!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly recipe: Recipe,
    private readonly dialogRef: MatDialogRef<RecipeDetailsComponent>,
    private readonly fb: FormBuilder,
    private readonly store: Store) {

    this.form = this.createForm(recipe);
  }

  public onClose(result?: boolean): void {
    this.dialogRef.close(result);
  }


  public onSubmit(): void {
    this.formSent = true;
    const value = this.form.value as RecipePayload;
    const action = this.recipe ? new RecipeActions.Update(this.recipe.id, value) : new RecipeActions.Create(value);

    this.store.dispatch(action).subscribe(() => {
      this.formSent = false;
      this.onClose(true);
    });
  }


  public onDelete(): void {
    this.formSent = true;
    this.store.dispatch(new RecipeActions.Delete(this.recipe.id)).subscribe(() => {
      this.formSent = false;
      this.onClose(true);
    });
  }


  private createForm(recipe?: Recipe): FormGroup<Form> {
    return this.fb.nonNullable.group({
      title: [recipe ? recipe.title : '', [Validators.required]],
      desc: [recipe ? recipe.desc : ''],
    });
  }
}
