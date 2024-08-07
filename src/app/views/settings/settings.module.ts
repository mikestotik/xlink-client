import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { SettingsAccountComponent } from './pages/settings-account/settings-account.component';
import { SettingsListComponent } from './pages/settings-list/settings-list.component';
import { SettingsRouting } from './settings.routing';


@NgModule({
  declarations: [
    SettingsListComponent,
    SettingsAccountComponent
  ],
  exports: [
    SettingsAccountComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(SettingsRouting),
    SharedModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule
  ]
})
export class SettingsModule {}
