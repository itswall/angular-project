import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movieapi.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { FavoritesService } from '../services/favorites.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  movieDetails: any;
  safeVideoUrl: SafeResourceUrl | null = null;
  director: string = '';
  writers: string[] = [];
  galleryImages: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private movieApi: MovieService,
    private sanitizer: DomSanitizer,
    private favoritesService: FavoritesService
  ) {}

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieApi.getMovieDetails(+movieId).subscribe(
        (data) => {
          this.movieDetails = data;
          if (this.movieDetails.videos && this.movieDetails.videos.results.length > 0) {
            const videoKey = this.movieDetails.videos.results[0].key;
            this.safeVideoUrl = this.sanitizer.bypassSecurityTrustResourceUrl(`https://www.youtube.com/embed/${videoKey}`);
          }

          if (this.movieDetails.images && this.movieDetails.images.backdrops) {
            this.galleryImages = this.movieDetails.images.backdrops.slice(0, 6);
          }

          this.extractCrewInfo();
        },
        (error) => {
          console.error('Error fetching movie details:', error);
        }
      );
    } else {
      console.error('No movie ID provided');
    }
  }

  extractCrewInfo(): void {
    if (this.movieDetails && this.movieDetails.credits && this.movieDetails.credits.crew) {
      this.director = this.movieDetails.credits.crew.find((member: any) => member.job === 'Director')?.name || 'Unknown';
      this.writers = this.movieDetails.credits.crew
        .filter((member: any) => member.department === 'Writing')
        .map((writer: any) => writer.name);
    }
  }
  addToFavorites(): void {
    if (this.movieDetails) {
      this.favoritesService.addToFavorites(this.movieDetails);
      alert('Filme adicionado aos favoritos!');
    }
  }

  
}