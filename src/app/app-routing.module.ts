import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddLeadComponent } from './add-lead/add-lead.component';
import { AddBatchComponent } from './add-batch/add-batch.component';
import { BatchDetailsComponent } from './batch-details/batch-details.component';
import { ViewBatchComponent } from './view-batch/view-batch.component';
import { SearchLeadsComponent } from './search-leads/search-leads.component';

const routes: Routes = [
  {
    path: 'add-lead',
    component: AddLeadComponent
  },
  {
    path: 'add-batch',
    component: AddBatchComponent
  },
  {
    path: 'batch-details',
    component: BatchDetailsComponent
  },
  {
    path: 'view-batch',
    component: ViewBatchComponent
  },
  {
    path: 'search-leads',
    component: SearchLeadsComponent
  },
  {
    path: 'branch',
    loadChildren: () =>
      import('./Modules/branch/branch.module').then(m => m.BranchModule)
  },
  {
    path: 'batch',
    loadChildren: () =>
      import('./Modules/batch/batch.module').then(m => m.BatchModule)
  },
  {
    path: 'course',
    loadChildren: () =>
      import('./Modules/course/course.module').then(m => m.CourseModule)
  },
  {
    path: 'trainer',
    loadChildren: () =>
      import('./Modules/trainer/trainer.module').then(m => m.TrainerModule)
  },
  {
    path: '',
    redirectTo: 'add-lead',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
