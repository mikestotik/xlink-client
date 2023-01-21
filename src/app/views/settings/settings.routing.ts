import { Routes } from '@angular/router';
import { SettingsRoutes } from '../../config/routes.config';
import { SettingsAccountComponent } from './pages/settings-account/settings-account.component';
import { SettingsListComponent } from './pages/settings-list/settings-list.component';


export const SettingsRouting: Routes = [
  {
    path: '',
    component: SettingsListComponent,
    children: [
      {
        path: '',
        redirectTo: SettingsRoutes.Account,
        pathMatch: 'full'
      },
      {
        path: SettingsRoutes.Account,
        component: SettingsAccountComponent
      }
    ]
  }
];
