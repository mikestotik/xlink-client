import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { TagComponent } from './components/tag/tag.component';
import { InputDirective } from './directives/input.directive';
import { SnackSimpleComponent } from './snacks/snack-simple/snack-simple.component';
import { EmptyListComponent } from './components/empty/empty-list.component';


@NgModule({
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule
  ],
  declarations: [
    TagComponent,
    SnackSimpleComponent,
    InputDirective,
    EmptyListComponent
  ],
  exports: [
    MatButtonModule,
    TagComponent,
    InputDirective,
    SnackSimpleComponent,
    EmptyListComponent
  ]
})
export class SharedModule {}
