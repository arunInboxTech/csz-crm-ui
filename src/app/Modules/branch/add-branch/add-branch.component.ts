import { AfterViewInit, ChangeDetectionStrategy, Component, Inject, OnInit, Optional } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BranchService } from '../../../Services/branch.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Branch } from 'src/app/Models/branch';

@Component({
  selector: 'app-add-branch',
  templateUrl: './add-branch.component.html',
  styleUrls: ['./add-branch.component.css'],
  standalone: false,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddBranchComponent implements OnInit, AfterViewInit {
  branchForm!: FormGroup;
  isEditMode = false;

  constructor(
    private fb: FormBuilder,
    private branchService: BranchService,
    @Optional() public dialogRef: MatDialogRef<AddBranchComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: { branch?: Branch }
  ) { }

  ngOnInit(): void {
    console.log('AddBranchComponent ngOnInit triggered');
    this.branchForm = this.fb.group({
      branch_name: ['', Validators.required],
      branch_address: ['', Validators.required],
      branch_phone1: ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      branch_phone2: ['', [Validators.pattern(/^\d{10}$/)]]
    });

    if (this.data && this.data.branch) {
      this.isEditMode = true;
      this.branchForm.patchValue(this.data.branch);
    }
  }

  ngAfterViewInit() {
    console.log('ngAfterViewInit called');
  }

  onSubmit(): void {
    if (this.branchForm.valid) {
      if (this.isEditMode && this.data.branch?.id_branch) {
        this.branchService.updateBranch(this.data.branch.id_branch, this.branchForm.value).subscribe({
          next: () => {
            alert('Branch updated successfully!');
            this.dialogRef.close('updated');
          },
          error: () => alert('Error updating branch.')
        });
      } else {
        this.branchService.addBranch(this.branchForm.value).subscribe({
          next: () => {
            alert('Branch added successfully!');
            this.dialogRef.close('added');
          },
          error: () => alert('Error adding branch.')
        });
      }
    } else {
      this.branchForm.markAllAsTouched();
    }
  }

  onReset(): void {
    this.branchForm.reset();
  }
}
