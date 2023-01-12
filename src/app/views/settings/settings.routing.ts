import { Routes } from '@angular/router';
import { SettingsRoutes } from '../../config/routes.config';
import { SettingsAccountComponent } from './pages/settings-account/settings-account.component';
import { SettingsComponent } from './settings.component';


export const SettingsRouting: Routes = [
  {
    path: '',
    component: SettingsComponent,
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
