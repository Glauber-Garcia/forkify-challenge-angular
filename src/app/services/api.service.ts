import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Recipe } from '../model/recipe';
import { Recipes } from '../model/recipes';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl = 'https://forkify-api.herokuapp.com/api';

  constructor(private http: HttpClient) { }
  
  search(query: String): Observable<Recipes> {
    var url = this.apiUrl + "/search?q=" + query;
    console.log(url);
    return this.http.get<Recipes>(url);
  }

  get(rId: String): Observable<Recipe> {
    var url = this.apiUrl + "/get?rId=" + rId;
    console.log(url);
    return this.http.get<Recipe>(url);
  }
}
