import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MovieService {
  private apiUrl = 'https://api.themoviedb.org/3';
  private apiKey = '0157108e78851df303fee3ae6ab4fe97'; 

  constructor(private http: HttpClient) {}

  getPopularMovies(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/movie/popular?api_key=${this.apiKey}&language=pt-BR`);
  }
  getGenres(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/genre/movie/list?api_key=${this.apiKey}&language=pt-BR`);
  }

  searchMovies(query: string): Observable<any> {
    return this.http.get<any>(
      `${this.apiUrl}/search/movie?api_key=${this.apiKey}&query=${query}&language=pt-BR`
    );
  }
}
