import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { CourseRoutingModule } from './course-routing.module';
import { GridActionButtonsComponent } from './grid-action-buttons/grid-action-buttons.component';
import { AddCourseComponent } from './add-course/add-course.component';
import { ViewCourseComponent } from './view-course/view-course.component';
import { AgGridModule } from 'ag-grid-angular';

@NgModule({
  declarations: [
    GridActionButtonsComponent,
    AddCourseComponent,
    ViewCourseComponent
  ],
  imports: [
    CommonModule,
    CourseRoutingModule,
    ReactiveFormsModule,
    MatDialogModule,
    AgGridModule
  ]
})
export class CourseModule { }
