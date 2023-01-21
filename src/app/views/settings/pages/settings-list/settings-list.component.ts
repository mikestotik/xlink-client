import { Component } from '@angular/core';
import { SettingsRoutes } from '../../../../config/routes.config';


@Component({
  templateUrl: './settings-list.component.html',
  styleUrls: [ './settings-list.component.scss' ]
})
export class SettingsListComponent {

  public settingsRoutes = SettingsRoutes;

}
