import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  constructor(public router: Router) {}

  ngOnInit(): void {}

  /**
   * Navigates to list of all movies (main page)
   */
  goToMovies(): void {
    this.router.navigate(['movies']);
  }

  /**
   * Navigates to the user profile
   */
  goToProfile(): void {
    this.router.navigate(['profile']);
  }

  /**
   * Logs out user, clears localStorage to reset token and usr
   */
  logOut(): void {
    localStorage.clear();
    this.router.navigate(['welcome']);
  }
}
