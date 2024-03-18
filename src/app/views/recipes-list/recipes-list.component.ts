import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { Recipe } from '../../model/recipe';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormBuilder, FormsModule } from '@angular/forms';
import { Recipes } from '../../model/recipes';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../../components/snackbar/snackbar.component';
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MessageDialogComponent } from '../../components/message-dialog/message-dialog.component';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

@Component({
  selector: 'app-recipes-list',
  standalone: true,
  imports: [
    MatIconModule,
    MatListModule,
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatTableModule,
    RouterModule,
    MatSortModule, MatPaginatorModule
  ],
  templateUrl: './recipes-list.component.html',
  styleUrl: './recipes-list.component.scss'
})
export class RecipesListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'publisher', 'image', 'details'];
  isLoadingResults!: boolean;
  searchString: string = '';
  recipes: Recipes | undefined;
  recipesList: Recipe[] = [];
  recipe: Recipe | undefined;
  durationInSeconds = 5;

  constructor(private service: ApiService, private router: Router, private _formBuilder: FormBuilder, private _snackBar: MatSnackBar, private route: ActivatedRoute, public dialog: MatDialog) { }

  ngOnInit() {
    var search = this.route.snapshot.params['search'];
    if (search != undefined) {
      this.searchString = search.replaceAll('\'', '');
      if (this.searchString != undefined && this.searchString != '' && this.searchString != 'undefined') {
        this.loadItems();
      } else {
        this.searchString = "";
        this.openDialog('Insira um termo valido para a pesquisa!')
      }
    }
  }

  openSnackBar(message: string) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      data: message,
      duration: this.durationInSeconds * 1000,
    });

  }

  openDialog(msg: any) {
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: { title: 'Atenção', msg },
    });
  }

  openDialogTerms() {
    var msg = "steak, bbq, hamburger, pie, sausage, kebab, poutine, chicken, toast, marzipan, parma ham, champ, lasagna, poke, croissant, bunny chow, pierogi, rendang, sushi, duck, curry, beef, goat, lamb, turkey, pork, fish, crab, bacon, ham, pepperoni, salami, ribs, carrot, broccoli, asparagus, cauliflower, corn, cucumber, green pepper, lettuce, mushrooms, onion, potato, pumpkin, red pepper, tomato, beetroot, brussel sprouts, peas, zucchini, radish, sweet potato, artichoke, leek, cabbage, celery, chili, garlic, basil, coriander, parsley, dill, rosemary, oregano, apple, apricot, avocado, banana, blackberry, blackcurrant, blueberry, boysenberry, cherry, coconut, fig, grape, grapefruit, kiwifruit, lemon, lime, lychee, mandarin, mango, melon, nectarine, orange, papaya, passion fruit, peach, pear, pineapple, plum, pomegranate, quince, raspberry, strawberry, watermelon, salad, pizza, pasta, popcorn, lobster, masala, paella, som tam, chips, fries, maple syrup, fajitas, chocolate, arepas, donuts, ice cream"
    const dialogRef = this.dialog.open(MessageDialogComponent, {
      data: { title: 'Lista de Termos Permitidos', msg },
    });
  }

  onSearch() {
    if (this.searchString.trim() != '') {
      this.loadItems();
      console.log('Botão de pesquisa clicado!');
    } else {
      this.openDialog('Insira um termo valido para a pesquisa!')
    }
  }

  loadItems() {
    this.service.search(this.searchString).subscribe((data: any) => {
      this.recipes = data;
      if (this.recipes != null && this.recipes != undefined) {
        this.recipesList = this.recipes.recipes;
        this.openSnackBar("A pesquisa retornou " + this.recipes.count + " Registros");
        this.recipesList.forEach(r => {
          console.log(r.title);
        });
      }
    });
  }



  async onItemClick(item: Recipe) {
    console.log('Item clicado:', item);
    var id = item.recipe_id;
    if (id != undefined) {
      this.service.get(id)
        .subscribe((data: Recipe) => {
          this.recipe = data;
          console.log(this.recipe);
        });
    }
  }

}
