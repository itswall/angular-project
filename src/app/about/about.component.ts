import { Component, OnInit } from '@angular/core';
import { MovieService } from '../services/movieapi.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css'
})
export class AboutComponent implements OnInit {
  movieDetails: any;

  constructor(private route: ActivatedRoute, private movieApi: MovieService) {

  }

  ngOnInit(): void {
    const movieId = this.route.snapshot.paramMap.get('id');
    if (movieId) {
      this.movieApi.getMovieDetails(+movieId).subscribe(
        (data) => {
          this.movieDetails = data;
        },
        (error) => {
          console.error('Error fetching movie details:', error);
          // Handle error (e.g., show error message to user)
        }
      );
    } else {
      console.error('No movie ID provided');
      // Handle error (e.g., redirect to home page)
    }
  }
}
