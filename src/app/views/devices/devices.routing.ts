import { Routes } from '@angular/router';
import { DeviceListComponent } from './pages/device-list/device-list.component';


export const DevicesRouting: Routes = [
  {
    path: '',
    component: DeviceListComponent
  }
];
