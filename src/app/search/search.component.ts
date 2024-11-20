import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movieapi.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = [];
  genres: any[] = [];
  years: number[] = [];
  searchQuery: string = '';
  selectedGenre: string = '';

  constructor(private movieApi: MovieService, private router: Router) {}

  ngOnInit(): void {
    this.fetchMovies();
    this.fetchGenres();
  }

  fetchMovies(): void {
    this.movieApi.getPopularMovies().subscribe((data: any) => {
      this.movies = data.results;
      this.filteredMovies = [...this.movies];
    });
  }

  fetchGenres(): void {
    this.movieApi.getGenres().subscribe((data: any) => {
      this.genres = data.genres;
    });
  }


  applyFilters(): void {
    this.filteredMovies = this.movies.filter((movie) => {
      const matchesGenre =
        this.selectedGenre === '' || movie.genre_ids.includes(+this.selectedGenre);
      const matchesSearch =
        this.searchQuery === '' ||
        movie.title.toLowerCase().includes(this.searchQuery.toLowerCase());

      return matchesGenre && matchesSearch;
    });
  }

  navigateToDetails(movieId: number): void {
    this.router.navigate(['/details', movieId]);
  }
}