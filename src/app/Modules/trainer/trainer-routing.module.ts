import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewTrainerListComponent } from './view-trainer-list/view-trainer-list.component';
import { AddTrainerComponent } from './add-trainer/add-trainer.component';

const routes: Routes = [
  {
    path: 'add-trainer',
    component: AddTrainerComponent
  },
  {
    path: 'view-trainer-list',
    component: ViewTrainerListComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TrainerRoutingModule { }
