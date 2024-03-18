import { Component, Inject, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {
  MAT_SNACK_BAR_DATA,
  MatSnackBar,
  MatSnackBarAction,
  MatSnackBarActions,
  MatSnackBarLabel,
  MatSnackBarRef,
} from '@angular/material/snack-bar';
import {MatButtonModule} from '@angular/material/button';

@Component({
  selector: 'app-snackbar',
  standalone: true,
  imports: [MatIconModule,MatButtonModule, MatSnackBarLabel, MatSnackBarActions, MatSnackBarAction],
  templateUrl: './snackbar.component.html',
  styleUrl: './snackbar.component.scss'
})
export class SnackbarComponent {
  message: String;
  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: any) { 
    this.message = data;
  }
  snackBarRef = inject(MatSnackBarRef);
}
