import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatDialogModule } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { Recipe } from '../../model/recipe';
import { ApiService } from '../../services/api.service';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';


@Component({
  selector: 'app-recipes-detail',
  standalone: true,
  imports: [MatCardModule, MatIconModule, MatSidenavModule, MatListModule, MatDialogModule, MatButtonModule, RouterModule, CommonModule,MatCheckboxModule,MatProgressSpinnerModule],
  templateUrl: './recipes-detail.component.html',
  styleUrl: './recipes-detail.component.scss'
})
export class RecipesDetailComponent implements OnInit {

  recipe: Recipe | undefined;
  search: String = "";
  image: string = "";
  isLoadingResults = true;

  constructor(private route: ActivatedRoute, private api: ApiService, private router: Router) {

  }
  onBack() {
    var str = 'recipes-list/' + this.search;
    this.router.navigateByUrl(str);
  }
  ngOnInit(): void {
    this.isLoadingResults = true;
    var id = this.route.snapshot.params['id'];
    this.route.queryParams.subscribe(
      params => {
        this.search = params['search'];
      }
    )
    this.getRecipe(id);
    if (this.recipe != undefined) {
      this.image = this.recipe.image_url;
    }
    this.isLoadingResults = false;
  }
  async getRecipe(id: any) {
    if (id != undefined) {
      this.api.get(id)
        .subscribe((data: any) => {
          var r = data.recipe;
          this.recipe = r;
          console.log(this.recipe);
        });
    }
  }
}
