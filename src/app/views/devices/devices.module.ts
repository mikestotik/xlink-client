import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { DevicesRouting } from './devices.routing';
import { AssetDetailsComponent } from './dialogs/asset-details/asset-details.component';
import { DeviceDetailsComponent } from './dialogs/device-details/device-details.component';
import { DeviceListComponent } from './pages/device-list/device-list.component';
import { DeviceAssetsComponent } from './pages/device-assets/device-assets.component';
import { AssetDeviceNamePipe } from './pipes/asset-device-name.pipe';
import { AssetPermissionNamePipe } from './pipes/asset-permission-name.pipe';


@NgModule({
  declarations: [
    DeviceListComponent,
    DeviceDetailsComponent,
    DeviceAssetsComponent,
    AssetDetailsComponent,
    AssetDeviceNamePipe,
    AssetPermissionNamePipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(DevicesRouting),
    MatButtonModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatMenuModule,
    MatTableModule
  ]
})
export class DevicesModule {}
