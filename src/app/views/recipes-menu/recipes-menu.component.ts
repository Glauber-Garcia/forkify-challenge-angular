import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-recipes-menu',
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule, MatCardModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './recipes-menu.component.html',
  styleUrl: './recipes-menu.component.scss'
})
export class RecipesMenuComponent {

}
