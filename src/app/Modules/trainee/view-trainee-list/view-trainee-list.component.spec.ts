import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTraineeListComponent } from './view-trainee-list.component';

describe('ViewTraineeListComponent', () => {
  let component: ViewTraineeListComponent;
  let fixture: ComponentFixture<ViewTraineeListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTraineeListComponent]
    });
    fixture = TestBed.createComponent(ViewTraineeListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
