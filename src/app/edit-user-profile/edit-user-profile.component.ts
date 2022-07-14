// Angular imports
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Data imports
import { FetchApiDataService } from '../fetch-api-data.service';

// Angular Material imports
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit-user-profile',
  templateUrl: './edit-user-profile.component.html',
  styleUrls: ['./edit-user-profile.component.scss'],
})
export class EditUserProfileComponent implements OnInit {
  @Input() userData: any = {};

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<EditUserProfileComponent>,
    public snackBar: MatSnackBar,
    public router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Allows users to edit their personal details
   */
  editUser(): void {
    console.log(this.userData);
    this.fetchApiData.editUser(this.userData).subscribe((result) => {
      this.dialogRef.close();
      console.log(result);
      this.snackBar.open('You have successfully updated your profile', 'OK', {
        duration: 2000,
      });
      // Logs out user if they update username or password to avoid errors
      if (this.userData.Username || this.userData.Password) {
        localStorage.clear();
        this.router.navigate(['welcome']);
        this.snackBar.open(
          'Please log in again with your new log in details',
          'OK',
          {
            duration: 2000,
          }
        );
      }
    });
  }
}
