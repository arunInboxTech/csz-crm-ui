import { Component } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { ICellRendererParams } from 'ag-grid-community';

@Component({
  selector: 'app-grid-action-buttons',
  template: `
    <div class="d-flex gap-2">
    <i class="bi bi-pencil-square text-success me-2" title="Edit" style="cursor:pointer;" (click)="onEdit($event)"></i>
    <i class="bi bi-trash text-danger" title="Delete" style="cursor:pointer;" (click)="onDelete($event)"></i>
     
    </div>
  `
})
export class GridActionButtonsComponent implements ICellRendererAngularComp {
  params!: ICellRendererParams;

  agInit(params: ICellRendererParams): void {
    this.params = params;
  }

  refresh(params: ICellRendererParams): boolean {
    return false;
  }

  onEdit(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.params.context.componentParent) {
      this.params.context.componentParent.editBranch(this.params.data.id_branch);
    }
  }

  onDelete(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    if (this.params.context.componentParent) {
      this.params.context.componentParent.deleteBranch(this.params.data.id_branch);
    }
  }
}
