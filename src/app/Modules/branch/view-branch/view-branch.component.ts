import { Component, OnInit } from '@angular/core';
import { BranchService } from '../../../Services/branch.service';
import { ColDef, GridReadyEvent } from 'ag-grid-community';
import { Branch } from 'src/app/Models/branch';
import { MatDialog } from '@angular/material/dialog';
import { AddBranchComponent } from '../add-branch/add-branch.component';
import { GridActionButtonsComponent } from '../grid-action-buttons/grid-action-buttons.component';

@Component({
  selector: 'app-view-branch',
  templateUrl: './view-branch.component.html',
  styleUrls: ['./view-branch.component.css']
})
export class ViewBranchComponent implements OnInit {
  branches: Branch[] = [];
  context = { componentParent: this };


  columnDefs: ColDef[] = [
    { headerName: 'Branch Name', field: 'branch_name', sortable: true, filter: true },
    { headerName: 'Address', field: 'branch_address', sortable: true, filter: true },
    { headerName: 'Phone 1', field: 'branch_phone1', sortable: true, filter: true },
    { headerName: 'Phone 2', field: 'branch_phone2', sortable: true, filter: true },
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
    private branchService: BranchService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.loadBranches();
  }

  loadBranches(): void {
    this.branchService.getBranches().subscribe({
      next: (data: Branch[]) => this.branches = data,
      error: () => alert('Failed to load branches')
    });
  }

  openAddBranch(): void {
    const dialogRef = this.dialog.open(AddBranchComponent, {
      width: '800px', // Increased width
      maxWidth: '90vw', // Maximum width of 90% of viewport
      maxHeight: '90vh', // Maximum height of 90% of viewport
      disableClose: true,
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result === 'added') {
        this.loadBranches();
      }
    });
  }

  editBranch(id: number): void {
    const branch = this.branches.find(b => b.id_branch === id);
    if (branch) {
      const dialogRef = this.dialog.open(AddBranchComponent, {
        width: '800px', // Increased width
        maxWidth: '90vw', // Maximum width of 90% of viewport
        maxHeight: '90vh', // Maximum height of 90% of viewport
        disableClose: true,
        data: { branch }
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result === 'updated') {
          this.loadBranches();
        }
      });
    }
  }

  deleteBranch(id: number): void {
    if (confirm('Are you sure you want to delete this branch?')) {
      this.branchService.deleteBranch(id).subscribe({
        next: () => {
          alert('Branch deleted');
          this.loadBranches();
        },
        error: () => alert('Failed to delete branch')
      });
    }
  }

  onGridReady(params: GridReadyEvent): void {
    params.api.sizeColumnsToFit();
  }
}
