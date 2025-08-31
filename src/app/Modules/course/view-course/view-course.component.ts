import { Component, OnInit } from '@angular/core';
import { CourseService } from '../../../Services/course.service';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { Course } from 'src/app/Models/course';
import { MatDialog } from '@angular/material/dialog';
import { AddCourseComponent } from '../add-course/add-course.component';
import { GridActionButtonsComponent } from '../grid-action-buttons/grid-action-buttons.component';

@Component({
  selector: 'app-view-course',
  templateUrl: './view-course.component.html',
  styleUrls: ['./view-course.component.css']
})
export class ViewCourseComponent implements OnInit {
  courses: Course[] = [];
  context = { componentParent: this };

  columnDefs: ColDef[] = [
    { headerName: 'Course Name', field: 'course_name', sortable: true, filter: true },
    { headerName: 'Category', field: 'course_category', sortable: true, filter: true },
    { headerName: 'Duration', field: 'course_duration', sortable: true, filter: true },
    { headerName: 'Schedule', field: 'course_shedule', sortable: true, filter: true },
    { headerName: 'Fee', field: 'course_fee', sortable: true, filter: true },
    {
      headerName: 'Actions',
      cellRenderer: GridActionButtonsComponent,
      width: 150
    }
  ];

  defaultColDef: ColDef = {
    resizable: true
  };

  constructor(
    private courseService: CourseService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadCourses();
  }

  loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (data: Course[]) => this.courses = data,
      error: () => alert('Failed to load courses')
    });
  }

  openAddCourse(): void {
    const dialogRef = this.dialog.open(AddCourseComponent, {
      width: '800px',
      maxWidth: '90vw',
      maxHeight: '90vh',
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'added') {
        this.loadCourses();
      }
    });
  }

  editCourse(id: number): void {
    const course = this.courses.find(c => c.id_course === id);
    if (course) {
      const dialogRef = this.dialog.open(AddCourseComponent, {
        width: '800px',
        maxWidth: '90vw',
        maxHeight: '90vh',
        disableClose: true,
        data: { course }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'updated') {
          this.loadCourses();
        }
      });
    }
  }

  deleteCourse(id: number): void {
    if (confirm('Are you sure you want to delete this course?')) {
      this.courseService.deleteCourse(id).subscribe({
        next: () => {
          alert('Course deleted');
          this.loadCourses();
        },
        error: () => alert('Failed to delete course')
      });
    }
  }

  onGridReady(params: GridReadyEvent): void {
    params.api.sizeColumnsToFit();
  }
}
