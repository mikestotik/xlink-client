import { Injectable } from '@angular/core';
import { State } from '@ngxs/store';
import { SettingsModel } from '../../../interfaces/settings.interface';


@State<SettingsModel>({
  name: 'settings'
})
@Injectable()
export class SettingsState {

  constructor() { }

}
