import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { EmptyListComponent } from './components/empty/empty-list.component';
import { TagComponent } from './components/tag/tag.component';
import { InputDirective } from './directives/input.directive';
import { AssetConditionPipe } from './pipes/asset-condition.pipe';
import { AssetDeviceNamePipe } from './pipes/asset-device-name.pipe';
import { AssetFieldNamePipe } from './pipes/asset-permission-name.pipe';
import { SnackSimpleComponent } from './snacks/snack-simple/snack-simple.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [
    TagComponent,
    SnackSimpleComponent,
    InputDirective,
    EmptyListComponent,
    AssetDeviceNamePipe,
    AssetFieldNamePipe,
    AssetConditionPipe
  ],
  exports: [
    MatButtonModule,
    TagComponent,
    InputDirective,
    SnackSimpleComponent,
    EmptyListComponent,
    AssetDeviceNamePipe,
    AssetFieldNamePipe,
    AssetConditionPipe
  ]
})
export class SharedModule {}
