import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Rule, RulePayload } from '../../../../interfaces/rule.interface';
import { RuleActions } from '../../../../models/rule/store/rule.actions';


interface Form {
  title: FormControl<string>;
  desc: FormControl<string | undefined>;
}


@Component({
  templateUrl: './recipe-rule.component.html',
  styleUrls: [ './recipe-rule.component.scss' ]
})
export class RecipeRuleComponent {

  public form!: FormGroup<Form>;
  public formSent!: boolean;


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly rule: Rule,
    private readonly dialogRef: MatDialogRef<RecipeRuleComponent>,
    private readonly fb: FormBuilder,
    private readonly store: Store) {

    this.form = this.createForm(rule);
  }


  public onClose(result?: boolean): void {
    this.dialogRef.close(result);
  }


  public onSubmit(): void {
    this.formSent = true;
    const value = { ...this.rule, ...this.form.value } as RulePayload;
    const action = this.rule.id ? new RuleActions.Update(this.rule.id, value) : new RuleActions.Create(value);

    this.store.dispatch(action).subscribe(() => {
      this.formSent = false;
      this.onClose(true);
    });
  }


  public onDelete(): void {
    this.formSent = true;
    this.store.dispatch(new RuleActions.Delete(this.rule.id)).subscribe(() => {
      this.formSent = false;
      this.onClose(true);
    });
  }


  private createForm(data?: Rule): FormGroup<Form> {
    return this.fb.nonNullable.group({
      title: [ data ? data.title : '', [ Validators.required ] ],
      desc: [ data ? data.desc : '' ]
    });
  }
}
