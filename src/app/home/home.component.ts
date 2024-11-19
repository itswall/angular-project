import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movieapi.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  movies: any[] = []; // Todos os filmes carregados
  filteredMovies: any[] = []; // Filmes exibidos após filtragem
  genres: any[] = []; // Lista de gêneros
  years: number[] = []; // Lista de anos para o filtro
  searchQuery: string = ''; // Texto de busca
  selectedGenre: string = ''; // Gênero selecionado
  selectedYear: string = ''; // Ano selecionado
  router: any;

  constructor(private movieApi: MovieService) {}

  ngOnInit(): void {
    this.fetchMovies(); // Carrega os filmes populares
    this.fetchGenres(); // Carrega a lista de gêneros
    this.generateYears(); // Gera a lista de anos para o filtro
  }

  fetchMovies(): void {
    this.movieApi.getPopularMovies().subscribe((data) => {
      this.movies = data.results;
      this.filteredMovies = [...this.movies]; // Inicializa os filmes exibidos
    });
  }

  fetchGenres(): void {
    this.movieApi.getGenres().subscribe((data) => {
      this.genres = data.genres; // Recebe a lista de gêneros
    });
  }

  generateYears(): void {
    const currentYear = new Date().getFullYear();
    for (let year = currentYear; year >= 2000; year--) {
      this.years.push(year); // Gera anos de 2000 até o ano atual
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