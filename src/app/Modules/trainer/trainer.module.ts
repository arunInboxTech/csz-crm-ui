import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';
import { TrainerRoutingModule } from './trainer-routing.module';
import { ViewTrainerListComponent } from './view-trainer-list/view-trainer-list.component';
import { AddTrainerComponent } from './add-trainer/add-trainer.component';
import { GridActionButtonsComponent } from './grid-action-buttons/grid-action-buttons.component';


@NgModule({
  declarations: [
    ViewTrainerListComponent,
    AddTrainerComponent,
    GridActionButtonsComponent
  ],
  imports: [
    CommonModule,
    TrainerRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    AgGridModule
  ]
})
export class TrainerModule { }
