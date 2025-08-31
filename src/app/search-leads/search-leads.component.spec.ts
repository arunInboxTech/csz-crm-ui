import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchLeadsComponent } from './search-leads.component';

describe('SearchLeadsComponent', () => {
  let component: SearchLeadsComponent;
  let fixture: ComponentFixture<SearchLeadsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchLeadsComponent]
    });
    fixture = TestBed.createComponent(SearchLeadsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
