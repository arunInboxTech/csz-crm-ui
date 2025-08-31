import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Batch, BatchResponse } from '../Models/batch';

@Injectable({
  providedIn: 'root'
})
export class BatchService {
  private apiUrl = 'http://localhost:5000/api/batches';

  constructor(private http: HttpClient) {}

  getBatches(): Observable<Batch[]> {
    return this.http.get<Batch[]>(this.apiUrl);
  }

  addBatch(batch: Batch): Observable<BatchResponse> {
    return this.http.post<BatchResponse>(this.apiUrl, batch);
  }

  updateBatch(id: number, batch: Batch): Observable<BatchResponse> {
    return this.http.put<BatchResponse>(`${this.apiUrl}/${id}`, batch);
  }

  deleteBatch(id: number): Observable<BatchResponse> {
    return this.http.delete<BatchResponse>(`${this.apiUrl}/${id}`);
  }
}
