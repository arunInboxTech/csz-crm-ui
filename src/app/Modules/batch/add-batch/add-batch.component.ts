import { ChangeDetectionStrategy, Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BatchService } from '../../../Services/batch.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Batch } from 'src/app/Models/batch';
import { batchStatus } from 'src/app/Config/batchConfig';
import { CourseService } from 'src/app/Services/course.service';
import { TrainerService } from 'src/app/Services/trainer.service';
import { Course } from 'src/app/Models/course';
import { Trainer } from 'src/app/Models/trainer';

@Component({
  selector: 'app-add-batch',
  templateUrl: './add-batch.component.html',
  styleUrls: ['./add-batch.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddBatchComponent implements OnInit {
  batchForm!: FormGroup;
  isEditMode = false;
  BatchStatus = batchStatus;
  batchStatusSorted = Object.keys(this.BatchStatus).map(key => ({
    key,
    value: this.BatchStatus[key as keyof typeof batchStatus]
  }));
  courses: Course[] = []; // Add interface for Course
  trainers: Trainer[] = []; // Add interface for Trainer



  constructor(
    private fb: FormBuilder,
    private batchService: BatchService,
    private courseService: CourseService,
    private trainerService: TrainerService,
    @Optional() private dialogRef: MatDialogRef<AddBatchComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { batch?: Batch }
  ) {
    this.createForm();
  }

  ngOnInit(): void {

    // Load dropdown data
    this.loadCourses();
    this.loadTrainers();
  }

  createForm() {
    this.batchForm = this.fb.group({
      batch_name: ['', Validators.required],
      batch_course_id: ['', Validators.required],
      trainer_id: ['', Validators.required],
      start_date: ['', Validators.required],
      exp_end_date: ['', Validators.required],
      completion_date: [''],
      batch_status: ['', Validators.required],
      exp_joiner: ['', Validators.required],
      is_batch_completed: [false]
    }, { validators: this.dateValidators });

    // If editing, patch the form with existing data
    if (this.data?.batch) {
      this.batchForm.patchValue(this.data.batch);
      this.batchForm.get('exp_end_date')?.disable();
    }

    // Subscribe to start date changes to update min date for end date
    this.batchForm.get('start_date')?.valueChanges.subscribe(() => {
      this.batchForm.get('exp_end_date')?.updateValueAndValidity();
      this.batchForm.get('completion_date')?.updateValueAndValidity();
    });
  }

  onSubmit(): void {
    if (this.batchForm.valid) {
      if (this.isEditMode && this.data.batch?.batch_id) {
        this.batchService.updateBatch(this.data.batch.batch_id, this.batchForm.value)
          .subscribe({
            next: () => {
              alert('Batch updated successfully!');
              this.dialogRef.close('updated');
            },
            error: () => alert('Error updating batch.')
          });
      } else {
        this.batchService.addBatch(this.batchForm.value)
          .subscribe({
            next: () => {
              alert('Batch added successfully!');
              this.dialogRef.close('added');
            },
            error: () => alert('Error adding batch.')
          });
      }
    }
  }

  onReset(): void {
    this.batchForm.reset();
  }

  // Add methods to load the dropdown data
  private loadCourses(): void {
    this.courseService.getCourses().subscribe({
      next: (data) => {
        this.courses = data.map(course => ({
          id_course: course.id_course,
          course_name: course.course_name,
          course_category: course.course_category,
          course_duration: course.course_duration,
          course_content: course.course_content,
          course_shedule: course.course_shedule,
          course_fee: course.course_fee,
          course_id_branch: course.course_id_branch
        })).sort((a, b) => a.course_name.localeCompare(b.course_name)); // Sort alphabetically by course_name
      },
      error: (error) => {
        console.error('Error loading courses:', error);
        // Handle error - maybe show a notification to user
      }
    });
  }

  private loadTrainers(): void {
    this.trainerService.getTrainers().subscribe({
      next: (data) => {
        this.trainers = data.map(trainer => ({
          trainer_id: trainer.trainer_id,
          trainer_branch_id: trainer.trainer_branch_id,  // Ensure these fields are mapped
          trainer_name: trainer.trainer_name,
          trainer_phone: trainer.trainer_phone,
          trainer_email: trainer.trainer_email,
          trainer_address: trainer.trainer_address,
          trainer_status: trainer.trainer_status
        })).sort((a, b) => a.trainer_name.localeCompare(b.trainer_name));
      },
      error: (error) => {
        console.error('Error loading trainers:', error);
        // Handle error - maybe show a notification to user
      }
    });
  }

  dateValidators(group: FormGroup) {
    const start = group.get('start_date')?.value;
    const end = group.get('exp_end_date')?.value;
    const completion = group.get('completion_date')?.value;

    let errors = {};

    if (start && end && new Date(end) <= new Date(start)) {
      errors = { ...errors, endDateInvalid: true };
    }

    if (start && completion && new Date(completion) <= new Date(start)) {
      errors = { ...errors, completionDateInvalid: true };
    }

    return Object.keys(errors).length ? errors : null;
  }

}
