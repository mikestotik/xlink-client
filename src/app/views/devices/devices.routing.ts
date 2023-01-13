import { Routes } from '@angular/router';
import { DeviceAssetsComponent } from './pages/device-assets/device-assets.component';
import { DeviceListComponent } from './pages/device-list/device-list.component';


export const DevicesRouting: Routes = [
  {
    path: '',
    component: DeviceListComponent,
    children: [
      {
        path: ':id',
        component: DeviceAssetsComponent
      }
    ]
  }
];
