import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { filter, map, Observable, Subject, takeUntil } from 'rxjs';
import { Trigger, TriggerCondition, TriggerPayload } from 'src/app/interfaces/trigger.interface';
import { ConditionalOperator } from '../../../../enums/condition.enum';
import { Asset } from '../../../../interfaces/asset.interface';
import { Device } from '../../../../interfaces/device.interface';
import { AssetState } from '../../../../models/asset/store/asset.state';
import { DeviceState } from '../../../../models/device/store/device.state';
import { TriggerActions } from '../../../../models/trigger/store/trigger.actions';
import { TriggerState } from '../../../../models/trigger/store/trigger.state';


interface Form {
  title: FormControl<string>;
  desc: FormControl<string | undefined>;
  recoveryTime: FormControl<number>;
  recoveryTrigger: FormControl<number | undefined>;
  conditions: FormArray;
}


@Component({
  templateUrl: './recipe-rule-trigger.component.html',
  styleUrls: [ './recipe-rule-trigger.component.scss' ]
})
export class RecipeRuleTriggerComponent implements OnInit, OnDestroy {

  @Select(DeviceState.selectAll)
  public devices$!: Observable<Device[]>;

  @Select(AssetState.selectByDevice)
  public deviceAssets$!: Observable<(deviceId: number) => Asset[]>;

  @Select(TriggerState.selectAll)
  public triggers$!: Observable<Trigger[]>;

  public form!: FormGroup<Form>;
  public formSent!: boolean;

  public operator = ConditionalOperator;

  private destroy$ = new Subject<void>();


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public entity: Trigger,
    private readonly dialogRef: MatDialogRef<RecipeRuleTriggerComponent>,
    private readonly fb: FormBuilder,
    private readonly store: Store) {

    this.form = this.createForm(entity);

    if (entity?.conditions?.length) {
      entity.conditions.forEach(i => this.onAddCondition(i));
    }
  }


  get conditions() {
    return this.form.controls.conditions as FormArray;
  }


  public ngOnInit(): void {
    if (this.entity.id) {
      this.store.select(TriggerState.selectOne).pipe(
        map(filterFn => filterFn(this.entity.id)),
        filter(entity => !!entity),
        takeUntil(this.destroy$)
      ).subscribe(entity => this.entity = entity);
    }
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


  public onAddAsset(asset: Asset): void {
    this.store.dispatch(new TriggerActions.AddAsset(this.entity.id, asset.id));
  }


  public onDeleteAsset(asset: Asset): void {
    this.store.dispatch(new TriggerActions.DeleteAsset(this.entity.id, asset.id));
  }


  public onAddCondition(condition?: TriggerCondition) {
    const form = this.fb.group({
      operator: [ condition ? condition.operator : ConditionalOperator.Equal, Validators.required ],
      value: [ condition ? condition.value : null, Validators.required ],
      chain: [ condition ? condition.chain : null ]
    });
    this.form.controls.conditions.push(form);
  }


  public onDeleteCondition(index: number) {
    this.form.controls.conditions.removeAt(index);
  }


  private createForm(entity?: Trigger): FormGroup<Form> {
    return this.fb.nonNullable.group({
      title: [ entity?.title ? entity.title : '', [ Validators.required ] ],
      desc: [ entity?.desc ],
      recoveryTime: [ entity?.recoveryTime ? entity.recoveryTime : 3600 ],
      recoveryTrigger: [ entity?.recoveryTrigger ? entity.recoveryTrigger : undefined ],
      conditions: this.fb.array([])
    });
  }

}
