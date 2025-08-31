import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GridActionButtonsComponent } from './grid-action-buttons.component';

describe('GridActionButtonsComponent', () => {
  let component: GridActionButtonsComponent;
  let fixture: ComponentFixture<GridActionButtonsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GridActionButtonsComponent]
    });
    fixture = TestBed.createComponent(GridActionButtonsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
