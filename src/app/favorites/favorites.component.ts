import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';


@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.css']
})
export class FavoritesComponent implements OnInit {
  favoriteMovies: any[] = [];

  constructor(private favoritesService: FavoritesService) {}

  ngOnInit(): void {
    this.loadFavorites();
  }

  loadFavorites(): void {
    this.favoriteMovies = this.favoritesService.getFavorites();
  }

  removeFromFavorites(movieId: number): void {
    this.favoritesService.removeFromFavorites(movieId);
    this.loadFavorites();
  }
}
