import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatDialogModule } from '@angular/material/dialog';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { BrowserModule, HAMMER_GESTURE_CONFIG, HammerModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { NgxsLoggerPluginModule } from '@ngxs/logger-plugin';
import { NgxsStoragePluginModule } from '@ngxs/storage-plugin';
import { NgxsModule } from '@ngxs/store';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { SocketIoModule } from 'ngx-socket-io';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { AppRouting } from './app.routing';
import { HammerConfig } from './config/hammer.config';
import { ErrorsInterceptor } from './interceptors/errors.interceptor';
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AccountState } from './models/account/store/account.state';
import { AssetState } from './models/asset/store/asset.state';
import { AuthState } from './models/auth/store/auth.state';
import { DeviceState } from './models/device/store/device.state';
import { RecipeState } from './models/recipe/store/recipe.state';
import { SettingsState } from './models/settings/store/settings.state';
import { StepState } from './models/step/store/step.state';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    RouterModule.forRoot(AppRouting, {}),
    BrowserModule,
    HammerModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgxsModule.forRoot([
      AuthState,
      AccountState,
      SettingsState,
      DeviceState,
      AssetState,
      RecipeState,
      StepState
    ], {
      developmentMode: !environment.production
    }),
    NgxsLoggerPluginModule.forRoot({
      disabled: !environment.logs.ngxs
    }),
    NgxsStoragePluginModule.forRoot({
      key: [
        'auth.accessToken',
        'auth.refreshToken'
      ]
    }),
    SocketIoModule.forRoot({
      url: environment.websocket.url,
      options: {
        transports: [ 'websocket' ],
        autoConnect: true,
        reconnection: true
      }
    }),
    MatSnackBarModule,
    MatDialogModule,
    MatBottomSheetModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorsInterceptor,
      multi: true
    },
    {
      provide: HAMMER_GESTURE_CONFIG,
      useClass: HammerConfig
    },
    provideEnvironmentNgxMask()
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule {}
