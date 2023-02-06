import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Subject } from 'rxjs';
import { ActionType } from '../../../../enums/action.enum';
import { RuleAction, RuleActionPayload } from '../../../../interfaces/action.interface';
import { RuleActionActions } from '../../../../models/action/store/action.actions';


interface Form {
  title: FormControl<string>;
  desc: FormControl<string | undefined>;
  type: FormControl<ActionType>;
}


@Component({
  selector: 'app-recipe-action',
  templateUrl: './recipe-action.component.html',
  styleUrls: [ './recipe-action.component.scss' ]
})
export class RecipeActionComponent implements OnInit, OnDestroy {

  public form!: FormGroup<Form>;
  public formSent!: boolean;
  public types = ActionType;

  private destroy$ = new Subject<void>();


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public entity: RuleAction,
    private readonly dialogRef: MatDialogRef<RecipeActionComponent>,
    private readonly fb: FormBuilder,
    private readonly store: Store) {

    this.form = this.createForm(entity);
  }


  public ngOnInit(): void {

  }


  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }


  public onClose(result?: boolean): void {
    this.dialogRef.close(result);
  }


  public onSubmit(): void {
    this.formSent = true;
    const value = { ...this.entity, ...this.form.value } as RuleActionPayload;
    const action = this.entity.id ? new RuleActionActions.Update(this.entity.id, value) : new RuleActionActions.Create(value);

    this.store.dispatch(action).subscribe(() => {
      this.formSent = false;
      this.onClose(true);
    });
  }


  public onDelete(): void {
    this.formSent = true;
    this.store.dispatch(new RuleActionActions.Delete(this.entity.id)).subscribe(() => {
      this.formSent = false;
      this.onClose(true);
    });
  }


  private createForm(entity?: RuleAction): FormGroup<Form> {
    return this.fb.nonNullable.group({
      title: [ entity?.title ? entity.title : '', [ Validators.required ] ],
      desc: [ entity?.desc ],
      type: [ entity?.type ? entity.type : ActionType.Email, [ Validators.required ] ]
    });
  }


}
