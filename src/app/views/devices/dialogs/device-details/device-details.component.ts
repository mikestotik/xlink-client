import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngxs/store';
import { Device, DevicePayload } from '../../../../interfaces/device.interface';
import { DeviceActions } from '../../../../models/device/store/device.actions';


interface Form {
  uuid: FormControl<string>;
  title: FormControl<string>;
  desc: FormControl<string | undefined>;
}


@Component({
  templateUrl: './device-details.component.html',
  styleUrls: ['./device-details.component.scss']
})
export class DeviceDetailsComponent {

  public form!: FormGroup<Form>;
  public formSent!: boolean;


  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly device: Device,
    private readonly dialogRef: MatDialogRef<DeviceDetailsComponent>,
    private readonly fb: FormBuilder,
    private readonly store: Store) {

    this.form = this.createForm(device);
  }


  public onClose(result?: boolean): void {
    this.dialogRef.close(result);
  }


  public onSubmit(): void {
    this.formSent = true;
    const value = this.form.value as DevicePayload;
    const action = this.device ? new DeviceActions.Update(this.device.id, value) : new DeviceActions.Create(value);

    this.store.dispatch(action).subscribe(() => {
      this.formSent = false;
      this.onClose(true);
    });
  }


  public onDelete(): void {
    this.formSent = true;
    this.store.dispatch(new DeviceActions.Delete(this.device.id)).subscribe(() => {
      this.formSent = false;
      this.onClose(true);
    });
  }


  private createForm(device?: Device): FormGroup<Form> {
    return this.fb.nonNullable.group({
      uuid: [device ? device.uuid : '', [Validators.required]],
      title: [device ? device.title : '', [Validators.required]],
      desc: [device ? device.desc : ''],
    });
  }

}
