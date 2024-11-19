import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movieapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  movies: any[] = []; 
  filteredMovies: any[] = [];
  genres: any[] = []; 
  years: number[] = []; 
  searchQuery: string = ''; 
  selectedGenre: string = ''; 
  selectedYear: string = ''; 
  router: any;

  constructor(private movieApi: MovieService) {}

  ngOnInit(): void {
    this.fetchMovies();
    this.fetchGenres();
    this.generateYears(); 
  }

  fetchMovies(): void {
    this.movieApi.getPopularMovies().subscribe((data) => {
      this.movies = data.results;
      this.filteredMovies = [...this.movies]; 
    });
  }

  fetchGenres(): void {
    this.movieApi.getGenres().subscribe((data) => {
      this.genres = data.genres;
    });
  }

  generateYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2000; year--) {
      this.years.push(year); 
    }
  }

  applyFilters(): void {
    this.filteredMovies = this.movies.filter((movie) => {
      const matchesGenre =
        this.selectedGenre === '' || movie.genre_ids.includes(+this.selectedGenre);
      const matchesYear =
        this.selectedYear === '' ||
        new Date(movie.release_date).getFullYear().toString() === this.selectedYear;
      const matchesSearch =
        this.searchQuery === '' ||
        movie.title.toLowerCase().includes(this.searchQuery.toLowerCase());

      return matchesGenre && matchesYear && matchesSearch;
    });
  }

  navigateToDetails(movieId: number): void {
    this.router.navigate(['/about', movieId]);
  }
}