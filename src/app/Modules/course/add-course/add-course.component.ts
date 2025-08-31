import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CourseService } from '../../../Services/course.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from 'src/app/Models/course';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {
  courseForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private courseService: CourseService,
    @Optional() private dialogRef: MatDialogRef<AddCourseComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { course?: Course }
  ) { }

  ngOnInit(): void {
    this.courseForm = this.fb.group({
      course_name: ['', Validators.required],
      course_id_branch: ['0'],
      course_category: ['', Validators.required],
      course_duration: ['', Validators.required],
      course_content: ['', Validators.required],
      course_shedule: ['', Validators.required],
      course_fee: ['', Validators.required]
    });

    if (this.data && this.data.course) {
      this.isEditMode = true;
      this.courseForm.patchValue(this.data.course);
    }
  }

  onSubmit(): void {
    if (this.courseForm.valid) {
      if (this.isEditMode && this.data.course?.id_course) {
        this.courseService.updateCourse(this.data.course.id_course, this.courseForm.value)
          .subscribe({
            next: () => {
              alert('Course updated successfully!');
              this.dialogRef.close('updated');
            },
            error: () => alert('Error updating course.')
          });
      } else {
        this.courseService.addCourse(this.courseForm.value)
          .subscribe({
            next: () => {
              alert('Course added successfully!');
              this.dialogRef.close('added');
            },
            error: () => alert('Error adding course.')
          });
      }
    }
  }

  onReset(): void {
    this.courseForm.reset();
  }
}
