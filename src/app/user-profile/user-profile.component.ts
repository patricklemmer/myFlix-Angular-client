import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

// Component imports
import { EditUserProfileComponent } from '../edit-user-profile/edit-user-profile.component';

// Data imports
import { FetchApiDataService } from '../fetch-api-data.service';

// Angular Material imports
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  user: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialog: MatDialog,
    public router: Router,
    public snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getUser();
  }

  /**
   * Gets user data from API call, sets the user variable to returned JSON file
   * @returns object holding user information
   * @function getUser
   */
  getUser(): void {
    this.fetchApiData.getUser().subscribe((resp: any) => {
      this.user = resp;
      console.log(this.user);
      return this.user;
    });
  }

  openEditProfileDialog(): void {
    this.dialog.open(EditUserProfileComponent, {
      width: '350px',
    });
  }

  /**
   * Deletes user profile, redirects to Welcome page
   * @function deleteUserProfile
   */
  deleteUserProfile(): void {
    if (
      confirm(
        'Do you really want to delete your user account? This action can not be undone.'
      )
    ) {
      this.router.navigate(['welcome']).then(() => {
        this.snackBar.open('Your accout has been successfully deleted', 'OK', {
          duration: 2000,
        });
      });
      this.fetchApiData.deleteUser().subscribe((result) => {
        console.log(result);
        localStorage.clear();
      });
    }
  }
}
