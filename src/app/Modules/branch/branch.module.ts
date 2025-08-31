import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AgGridModule} from 'ag-grid-angular';
import { BranchRoutingModule } from './branch-routing.module';
import { AddBranchComponent } from './add-branch/add-branch.component';
import { ViewBranchComponent } from './view-branch/view-branch.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { GridActionButtonsComponent } from './grid-action-buttons/grid-action-buttons.component';


@NgModule({
  declarations: [
    AddBranchComponent,
    ViewBranchComponent,
    GridActionButtonsComponent
  ],
  imports: [
    CommonModule,
    BranchRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule,
    MatDialogModule
  ]
})
export class BranchModule { }
