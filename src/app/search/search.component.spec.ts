import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { of } from 'rxjs';
import { SearchComponent } from './search.component';
import { MovieService } from '../services/movieapi.service';

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;
  let movieServiceMock: any;
  let routerMock: any;

  beforeEach(async () => {
    movieServiceMock = {
      getPopularMovies: jasmine.createSpy('getPopularMovies').and.returnValue(
        of({
          results: [
            { id: 1, title: 'Filme 1', genre_ids: [28], release_date: '2024-01-01', poster_path: '/path1.jpg' },
            { id: 2, title: 'Filme 2', genre_ids: [35], release_date: '2023-01-01', poster_path: '/path2.jpg' },
          ],
        })
      ),
      getGenres: jasmine.createSpy('getGenres').and.returnValue(
        of({
          genres: [
            { id: 28, name: 'Ação' },
            { id: 35, name: 'Comédia' },
          ],
        })
      ),
    };

    routerMock = {
      navigate: jasmine.createSpy('navigate'),
    };

    await TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule],
      providers: [
        { provide: MovieService, useValue: movieServiceMock },
        { provide: Router, useValue: routerMock },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch movies and genres on initialization', () => {
    expect(movieServiceMock.getPopularMovies).toHaveBeenCalled();
    expect(movieServiceMock.getGenres).toHaveBeenCalled();
    expect(component.movies.length).toBe(2);
    expect(component.genres.length).toBe(2);
  });

  it('should filter movies based on search query', () => {
    component.searchQuery = 'Filme 1';
    component.applyFilters();
    expect(component.filteredMovies.length).toBe(1);
    expect(component.filteredMovies[0].title).toBe('Filme 1');
  });

  it('should navigate to movie details on card click', () => {
    component.navigateToDetails(1);
    expect(routerMock.navigate).toHaveBeenCalledWith(['/details', 1]);
  });
});