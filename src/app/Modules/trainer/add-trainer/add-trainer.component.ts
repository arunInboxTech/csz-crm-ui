import { Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TrainerService } from '../../../Services/trainer.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Trainer } from 'src/app/Models/trainer';


@Component({
  selector: 'app-add-trainer',
  templateUrl: './add-trainer.component.html',
  styleUrls: ['./add-trainer.component.css']
})
export class AddTrainerComponent implements OnInit {
  trainerForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private trainerService: TrainerService,
    @Optional() private dialogRef: MatDialogRef<AddTrainerComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { trainer?: Trainer }
  ) { }

  ngOnInit(): void {
    this.trainerForm = this.fb.group({
      trainer_name: ['', Validators.required],
      trainer_phone: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      trainer_email: ['', [Validators.required, Validators.email]],   
      trainer_address: ['', Validators.required],
      trainer_status: ['Active', Validators.required]
    });

    if (this.data && this.data.trainer) {
      this.isEditMode = true;
      const trainerData = { ...this.data.trainer };
      this.trainerForm.patchValue(trainerData);
    }
  }

  onSubmit(): void {
    if (this.trainerForm.valid) {
      if (this.isEditMode && this.data.trainer?.trainer_id) {
        this.trainerService.updateTrainer(this.data.trainer.trainer_id, this.trainerForm.value)
          .subscribe({
            next: () => {
              alert('Trainer updated successfully!');
              this.dialogRef.close('updated');
            },
            error: () => alert('Error updating trainer.')
          });
      } else {
        this.trainerService.addTrainer(this.trainerForm.value)
          .subscribe({
            next: () => {
              alert('Trainer added successfully!');
              this.dialogRef.close('added');
            },
            error: () => alert('Error adding trainer.')
          });
      }
    }
  }

  onReset(): void {
    this.trainerForm.reset();
    if (!this.isEditMode) {
      this.trainerForm.patchValue({
        trainer_status: 'Active'
      });
    }
  }
}
