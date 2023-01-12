import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { AssetPermission, AssetUnit, DataType } from '../../../../enums/asset.enum';
import { Asset, AssetPayload } from '../../../../interfaces/asset.interface';
import { Device } from '../../../../interfaces/device.interface';
import { AssetActions } from '../../../../models/asset/store/asset.actions';
import { DeviceState } from '../../../../models/device/store/device.state';


interface AssetMetaForm {
  default: FormControl;
  min: FormControl;
  max: FormControl;
  unit: FormControl<string>;
}


interface Form {
  title: FormControl<string>;
  desc: FormControl<string | undefined>;
  icon: FormControl<string | undefined>;
  permission: FormControl<AssetPermission>;
  type: FormControl<DataType>;
  meta: FormGroup<AssetMetaForm>;
  link: FormControl<string>;
  device: FormControl;
}


@Component({
  selector: 'app-asset-details',
  templateUrl: './asset-details.component.html',
  styleUrls: ['./asset-details.component.scss']
})
export class AssetDetailsComponent {

  @Select(DeviceState.selectAll)
  public devices$!: Observable<Device[]>;

  public form!: FormGroup<Form>;
  public formSent!: boolean;

  public permissions = [
    { type: AssetPermission.Read, name: 'Read' },
    { type: AssetPermission.Write, name: 'Write' },
  ];

  public types = [
    { type: DataType.Integer, name: 'Integer' },
    { type: DataType.Double, name: 'Double' },
    { type: DataType.String, name: 'String' },
    { type: DataType.Boolean, name: 'Boolean' },
  ];

  public units = [
    { type: AssetUnit.Percent, name: `Percent (${AssetUnit.Percent})` },
    { type: AssetUnit.Celsius, name: `Celsius (${AssetUnit.Celsius})` },
  ];

  constructor(
    @Inject(MAT_DIALOG_DATA)
    public readonly asset: Asset,
    private readonly dialogRef: MatDialogRef<AssetDetailsComponent>,
    private readonly fb: FormBuilder,
    private readonly store: Store) {

    this.form = this.createForm(asset);
  }


  public onClose(result?: boolean): void {
    this.dialogRef.close(result);
  }


  public onSubmit(): void {
    this.formSent = true;
    const value = this.form.value as AssetPayload;
    const action = this.asset ? new AssetActions.Update(this.asset.id, value) : new AssetActions.Create(value);

    this.store.dispatch(action)
      .subscribe(() => {
        this.formSent = false;
        this.onClose(true);
      });
  }


  private createForm(asset?: Asset): FormGroup<Form> {
    return this.fb.nonNullable.group({
      title: [asset ? asset.title : '', [Validators.required]],
      desc: [asset ? asset.desc : ''],
      icon: [asset ? asset.icon : ''],
      permission: [asset ? asset.permission : AssetPermission.Read, [Validators.required]],
      type: [asset ? asset.type : DataType.Integer, [Validators.required]],
      meta: this.fb.nonNullable.group({
        default: [asset && asset.meta ? asset.meta.default : ''],
        min: [asset && asset.meta ? asset.meta.min : 0],
        max: [asset && asset.meta ? asset.meta.max : 1],
        unit: [asset && asset.meta ? asset.meta.unit : '']
      }
      ),
      link: [asset ? asset.link : '', [Validators.required]],
      device: [asset ? asset.device : '', [Validators.required]]
    }
    );
  }


  public onDelete(): void {
    this.formSent = true;
    this.store.dispatch(new AssetActions.Delete(this.asset.id)).subscribe(() => {
      this.formSent = false;
      this.onClose(true);
    });
  }
}
