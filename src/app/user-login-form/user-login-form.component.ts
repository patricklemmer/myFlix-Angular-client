// Angular imports
import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';

// Data imports
import { FetchApiDataService } from '../fetch-api-data.service';

// Angular Material imports
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
@Component({
  selector: 'app-user-login-form',
  templateUrl: './user-login-form.component.html',
  styleUrls: ['./user-login-form.component.scss'],
})
export class UserLoginFormComponent implements OnInit {
  @Input() userData = { Username: '', Password: '' };

  constructor(
    public fetchApiData: FetchApiDataService,
    public dialogRef: MatDialogRef<UserLoginFormComponent>,
    public snackBar: MatSnackBar,
    private router: Router
  ) {}

  ngOnInit(): void {}

  /**
   * Function sends user input in login form to database via fetchApiData service
   */
  loginUser(): void {
    this.fetchApiData.userLogin(this.userData).subscribe(
      (result) => {
        // Logic for a successful user login goes here (to be implemented)
        // This will close the modal on success
        this.dialogRef.close();
        console.log(result);
        // Add token and username to localStorage
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', result.user.Username);
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
        // If login successful, navigate to route 'movies'
        this.router.navigate(['movies']);
      },
      (result) => {
        console.log(result);
        this.snackBar.open(result, 'OK', {
          duration: 2000,
        });
      }
    );
  }
}
