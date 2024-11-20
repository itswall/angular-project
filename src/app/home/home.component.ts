import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MovieService } from '../services/movieapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  movies: any[] = [];
  filteredMovies: any[] = [];
  popularMovies: any[] = [];
  genres: any[] = [];
  searchQuery: string = '';
  selectedGenre: string = '';
  selectedYear: string = '';
  router: any;

  @ViewChild('popularMoviesGrid') popularMoviesGrid: ElementRef | undefined;
  @ViewChild('genreMoviesGrid') genreMoviesGrid: ElementRef | undefined;

  constructor(private movieApi: MovieService) {}

  ngOnInit(): void {
    this.fetchMovies();
    this.fetchGenres();
  }

  fetchMovies(): void {
    this.movieApi.getPopularMovies().subscribe((data) => {
      this.movies = data.results;
      this.popularMovies = this.movies; 
      this.filteredMovies = [...this.movies];  
    });
  }

  fetchGenres(): void {
    this.movieApi.getGenres().subscribe((data) => {
      this.genres = data.genres;
    });
  }

  applyFilters(): void {
    if (!this.searchQuery) {
      this.filteredMovies = [...this.movies]; 
    } else {
      this.filteredMovies = this.movies.filter((movie) =>
        movie.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    }
  }

  getMoviesByGenre(genreId: number): any[] {
    return this.movies.filter((movie) => movie.genre_ids.includes(genreId));
  }

  scrollLeft(section: string): void {
    const grid = section === 'popular' ? this.popularMoviesGrid : this.genreMoviesGrid;
    if (grid && grid.nativeElement) {
      grid.nativeElement.scrollLeft -= 200; 
    }
  }

  scrollRight(section: string): void {
    const grid = section === 'popular' ? this.popularMoviesGrid : this.genreMoviesGrid;
    if (grid && grid.nativeElement) {
      grid.nativeElement.scrollLeft += 200; 
    }
  }
}
