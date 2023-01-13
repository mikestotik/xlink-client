import { Pipe, PipeTransform } from '@angular/core';
import { Store } from '@ngxs/store';
import { DeviceState } from '../../../models/device/store/device.state';


@Pipe({
  name: 'assetDeviceName'
})
export class AssetDeviceNamePipe implements PipeTransform {

  constructor(
    private readonly store: Store) {
  }


  public transform(deviceId: number): string {
    return this.store.selectSnapshot(DeviceState.selectOne)(deviceId).title;
  }

}
