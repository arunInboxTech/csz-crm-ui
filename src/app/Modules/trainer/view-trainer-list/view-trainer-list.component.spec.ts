import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewTrainerListComponent } from './view-trainer-list.component';

describe('ViewTrainerListComponent', () => {
  let component: ViewTrainerListComponent;
  let fixture: ComponentFixture<ViewTrainerListComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewTrainerListComponent]
    });
    fixture = TestBed.createComponent(ViewTrainerListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
