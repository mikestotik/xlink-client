import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { StepType } from '../../../../enums/step.enum';
import { Step, StepPayload } from '../../../../interfaces/step.interface';
import { StepActions } from '../../../../models/step/store/step.actions';


interface Form {
  order: FormControl<number>;
  timer?: FormControl<Date>;
  title: FormControl<string>;
  desc: FormControl<string | undefined>;
  type: FormControl<StepType>;
}


@Component({
  templateUrl: './recipe-step.component.html',
  styleUrls: [ './recipe-step.component.scss' ]
})
export class RecipeStepComponent {

  public form!: FormGroup<Form>;
  public formSentSave!: boolean;
  public formSentDelete!: boolean;

  public types = [
    { type: StepType.General, name: 'General' },
    { type: StepType.Regular, name: 'Regular' }
  ];


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly step: Step,
    private readonly dialogRef: MatDialogRef<RecipeStepComponent>,
    private readonly fb: FormBuilder,
    private readonly store: Store) {

    this.form = this.createForm(step);
  }


  public onClose(result?: boolean): void {
    this.dialogRef.close(result);
  }


  public onSubmit(): void {
    this.formSentSave = true;

    const value = this.form.value as StepPayload;
    const action = this.step.id ? new StepActions.Update(this.step.id, value) : new StepActions.Create({
      ...this.step,
      ...value
    });

    this.store.dispatch(action)
      .subscribe(() => {
        this.formSentSave = false;
        this.onClose(true);
      });
  }


  public onDelete(): void {
    this.formSentDelete = true;

    this.store.dispatch(new StepActions.Delete(this.step.id)).subscribe(() => {
      this.formSentDelete = false;
      this.onClose(true);
    });
  }


  private createForm(step?: Step): FormGroup<Form> {
    return this.fb.nonNullable.group({
      title: [ step ? step.title : '', [ Validators.required ] ],
      desc: [ step ? step.desc : '' ],
      order: [ step ? step.order : 0, [ Validators.required ] ],
      type: [ step ? step.type : StepType.Regular, [ Validators.required ] ]
    });
  }

}
