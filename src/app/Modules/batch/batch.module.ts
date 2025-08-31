import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { AgGridModule } from 'ag-grid-angular';

import { BatchRoutingModule } from './batch-routing.module';
import { AddBatchComponent } from './add-batch/add-batch.component';
import { ViewBatchComponent } from './view-batch/view-batch.component';
import { GridActionButtonsComponent } from './grid-action-buttons/grid-action-buttons.component';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { NgxSpinnerModule } from 'ngx-spinner';

@NgModule({
  declarations: [
    AddBatchComponent,
    ViewBatchComponent,
    GridActionButtonsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    AgGridModule,
    BatchRoutingModule,
    MatSelectModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    NgxSpinnerModule
  ]
})
export class BatchModule { }
