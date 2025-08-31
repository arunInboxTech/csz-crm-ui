import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Branch, BranchResponse } from '../Models/branch';
@Injectable({
  providedIn: 'root'
})
export class BranchService {
  private apiUrl = 'http://localhost:5000/api/branches';

  constructor(private http: HttpClient) {}

  getBranches(): Observable<Branch[]> {
    return this.http.get<Branch[]>(`${this.apiUrl}`);
  }

  addBranch(branch: Branch): Observable<BranchResponse> {
    return this.http.post<BranchResponse>(`${this.apiUrl}`, branch);
  }

  updateBranch(id: number, branch: Branch): Observable<BranchResponse> {
    return this.http.put<BranchResponse>(`${this.apiUrl}/${id}`, branch);
  }

  deleteBranch(id: number): Observable<BranchResponse> {
    return this.http.delete<BranchResponse>(`${this.apiUrl}/${id}`);
  }
}