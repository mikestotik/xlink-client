import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { AssetsRouting } from './assets.routing';
import { AssetListComponent } from './pages/asset-list/asset-list.component';
import { AssetDetailsComponent } from './dialogs/asset-details/asset-details.component';
import { AssetPermissionNamePipe } from './pipes/asset-permission-name.pipe';
import { AssetDeviceNamePipe } from './pipes/asset-device-name.pipe';


@NgModule({
  declarations: [
    AssetListComponent,
    AssetDetailsComponent,
    AssetPermissionNamePipe,
    AssetDeviceNamePipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(AssetsRouting),
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    SharedModule,
    MatSelectModule,
    MatTableModule
  ]
})
export class AssetsModule {}
