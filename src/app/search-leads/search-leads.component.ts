import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient, HttpParams } from '@angular/common/http';
@Component({
  selector: 'app-search-leads',
  templateUrl: './search-leads.component.html',
  styleUrls: ['./search-leads.component.css']
})
export class SearchLeadsComponent {
  searchForm: FormGroup;
  leads: any[] = [];
  loading = false;

  columnDefs = [
    { headerName: 'Name', field: 'enq_name' },
    { headerName: 'Mobile', field: 'enq_phone1' },
    { headerName: 'Course', field: 'course_name' },
    { headerName: 'Status', field: 'enq_status' },
    { headerName: 'Assigend To', field: 'user_name' },
    { headerName: 'Enquired Date', field: 'enq_date' },
    { headerName: 'Follow-Up Date', field: 'enq_next_flw_dt' },
    {
      headerName: 'Actions',
      cellRenderer: (params: { data: { enq_id: any; }; }) => {
        return `
        <div class="action-icons">
          <i class="bi bi-eye-fill text-primary me-2" title="View" onclick="window.viewLead(${params.data.enq_id})"></i>
          <i class="bi bi-pencil-square text-success me-2" title="Edit" onclick="window.editLead(${params.data.enq_id})"></i>
          <i class="bi bi-chat-left-dots-fill text-info" title="Last Comment" onclick="window.viewComment(${params.data.enq_id})"></i>
        </div>
      `;
      },
      width: 130,
      suppressSizeToFit: true
    }
  ];

  defaultColDef = {
    sortable: true,
    filter: true,
    resizable: true
  };
  courseList = [
    { id: '1', name: 'Full Stack Development' },
    { id: '2', name: 'Data Science' },
    { id: '3', name: 'UI/UX Design' },
    // Add more as needed
  ];
  constructor(private fb: FormBuilder, private http: HttpClient) {
    this.searchForm = this.fb.group({
      from_date: [''],
      to_date: [''],
      status: [''],
      mobile: [''],
      source: [''],
      course: [''],
      branch: [''],
      assigned_to: ['']
    });
  }

  onSearch() {
    const values = this.searchForm.value;
    let params = new HttpParams();

    Object.entries(values).forEach(([key, value]) => {
      if (value !== null && value !== undefined && value !== '') {
        params = params.set(key, String(value));
      }
    });

    console.log('Query Params:', params.toString()); // Optional: debug
    this.http.get<any[]>('http://localhost:5000/api/enquiries/search', { params }).subscribe(
      data => this.leads = data,
      err => console.error('Search failed', err)
    );
  }

  onReset(): void {
    this.searchForm.reset();
    this.leads = [];
  }
}
