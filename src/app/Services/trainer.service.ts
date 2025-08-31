import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Trainer, TrainerResponse } from '../Models/trainer';

@Injectable({
  providedIn: 'root'
})
export class TrainerService {
  private apiUrl = 'http://localhost:5000/api/trainers';

  constructor(private http: HttpClient) {}

  getTrainers(): Observable<Trainer[]> {
    return this.http.get<Trainer[]>(this.apiUrl);
  }

  addTrainer(trainer: Trainer): Observable<TrainerResponse> {
    return this.http.post<TrainerResponse>(this.apiUrl, trainer);
  }

  updateTrainer(id: number, trainer: Trainer): Observable<TrainerResponse> {
    return this.http.put<TrainerResponse>(`${this.apiUrl}/${id}`, trainer);
  }

  deleteTrainer(id: number): Observable<TrainerResponse> {
    return this.http.delete<TrainerResponse>(`${this.apiUrl}/${id}`);
  }
}
