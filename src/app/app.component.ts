import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'projetoangular';

  constructor(private router: Router) {}

  goToAbout() {
    this.router.navigate(['/about']);
  }

  goToMenu() {
    this.router.navigate(['/']);
  }
  goToSearch() {
    this.router.navigate(['/search']);
  }
}
