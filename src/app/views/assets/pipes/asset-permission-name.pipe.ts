import { Pipe, PipeTransform } from '@angular/core';
import { AssetPermission, DataType } from '../../../enums/asset.enum';


@Pipe({
  name: 'assetPermissionName'
})
export class AssetPermissionNamePipe implements PipeTransform {

  public transform(value: AssetPermission | DataType, dict: 'perm' | 'type'): string {
    if (dict === 'perm') {
      switch (value) {
        case AssetPermission.Read:
          return 'Read';
        case AssetPermission.Write:
          return 'Write';
        case AssetPermission.ReadAndWrite:
          return 'ReadAndWrite';
      }
    }
    if (dict === 'type') {
      switch (value) {
        case DataType.Integer:
          return 'Integer';
        case DataType.Double:
          return 'Double';
        case DataType.String:
          return 'String';
      }
    }
    return '';
  }

}
