import { Routes } from '@angular/router';
import { MainRoutes } from '../../config/routes.config';
import { MainResolver } from '../../resolvers/main.resolver';
import { MainComponent } from './main.component';


export const MainRouting: Routes = [
  {
    path: '',
    component: MainComponent,
    resolve: [
      MainResolver
    ],
    children: [
      {
        path: '',
        redirectTo: MainRoutes.Devices,
        pathMatch: 'full'
      },
      {
        path: MainRoutes.Devices,
        loadChildren: () => import('../devices/devices.module').then(m => m.DevicesModule)
      },
      {
        path: MainRoutes.Recipes,
        loadChildren: () => import('../recipes/recipes.module').then(m => m.RecipesModule)
      },
      {
        path: MainRoutes.Settings,
        loadChildren: () => import('../settings/settings.module').then(m => m.SettingsModule)
      }
    ]
  }
];
