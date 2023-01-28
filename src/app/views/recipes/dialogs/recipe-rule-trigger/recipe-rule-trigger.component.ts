import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Trigger, TriggerPayload } from 'src/app/interfaces/trigger.interface';
import { TriggerActions } from '../../../../models/trigger/store/trigger.actions';


interface Form {
  title: FormControl<string>;
  desc: FormControl<string | undefined>;
  chain: FormControl<string | undefined>;
  recoveryTime: FormControl<number | undefined>;
  recoveryTrigger: FormControl<number | undefined>;
}


@Component({
  templateUrl: './recipe-rule-trigger.component.html',
  styleUrls: [ './recipe-rule-trigger.component.scss' ]
})
export class RecipeRuleTriggerComponent {

  public form!: FormGroup<Form>;
  public formSent!: boolean;


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly entity: Trigger,
    private readonly dialogRef: MatDialogRef<RecipeRuleTriggerComponent>,
    private readonly fb: FormBuilder,
    private readonly store: Store) {

    this.form = this.createForm(entity);
  }


  public onClose(result?: boolean): void {
    this.dialogRef.close(result);
  }


  public onSubmit(): void {
    this.formSent = true;
    const value = { ...this.entity, ...this.form.value } as TriggerPayload;
    const action = this.entity.id ? new TriggerActions.Update(this.entity.id, value) : new TriggerActions.Create(value);

    this.store.dispatch(action).subscribe(() => {
      this.formSent = false;
      this.onClose(true);
    });
  }


  public onDelete(): void {
    this.formSent = true;
    this.store.dispatch(new TriggerActions.Delete(this.entity.id)).subscribe(() => {
      this.formSent = false;
      this.onClose(true);
    });
  }


  private createForm(entity?: Trigger): FormGroup<Form> {
    return this.fb.nonNullable.group({
      title: [ entity ? entity.title : '', [ Validators.required ] ],
      desc: [ entity ? entity.desc : '' ],
      chain: [ entity ? entity.chain : '' ],
      recoveryTime: [ entity ? entity.recoveryTime : 10000 ],
      recoveryTrigger: [ entity ? entity.recoveryTrigger : undefined ]
    });
  }
}
