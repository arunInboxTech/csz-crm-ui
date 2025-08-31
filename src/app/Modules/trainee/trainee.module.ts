import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TraineeRoutingModule } from './trainee-routing.module';
import { GridActionButtonsComponent } from './grid-action-buttons/grid-action-buttons.component';
import { AddTraineeComponent } from './add-trainee/add-trainee.component';
import { ViewTraineeListComponent } from './view-trainee-list/view-trainee-list.component';


@NgModule({
  declarations: [
    GridActionButtonsComponent,
    AddTraineeComponent,
    ViewTraineeListComponent
  ],
  imports: [
    CommonModule,
    TraineeRoutingModule
  ]
})
export class TraineeModule { }
