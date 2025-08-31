import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBatchComponent } from './add-batch/add-batch.component';
import { ViewBatchComponent } from './view-batch/view-batch.component';

const routes: Routes = [
  {
    path: 'add-batch',
    component: AddBatchComponent
  },
  {
    path: 'view-batch',
    component: ViewBatchComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BatchRoutingModule { }
