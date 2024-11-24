import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {
  private favorites: any[] = [];
  private customLists: { name: string; movies: any[] }[] = [];

  constructor() {}

  addToFavorites(movie: any): void {
    if (!this.favorites.find(fav => fav.id === movie.id)) {
      this.favorites.push(movie);
    }
  }

  removeFromFavorites(movieId: number): void {
    this.favorites = this.favorites.filter(movie => movie.id !== movieId);
  }

  getFavorites(): any[] {
    return this.favorites;
  }

}
