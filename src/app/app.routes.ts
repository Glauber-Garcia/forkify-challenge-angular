import { Routes } from '@angular/router';
import { RecipesListComponent } from './views/recipes-list/recipes-list.component';
import { RecipesDetailComponent } from './views/recipes-detail/recipes-detail.component';

export const routes: Routes = [
    { path: '', component: RecipesListComponent },
    { path: 'recipes-list/:search', component: RecipesListComponent },
    { path: 'recipes-detail/:id', component: RecipesDetailComponent,},
];
