import { EventEmitter, Injectable } from '@angular/core';
import { Category } from '../model/category.model';
import { Furniture } from '../model/furniture.model';
import { Observable } from 'rxjs';
import { HttpClient, HttpResponse, HttpHeaders } from '@angular/common/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  categoryUpdated = new EventEmitter<Category>();

  categoryList: Category [] = [];

  constructor(private http: HttpClient) { }

  loadCategories() {
    return this.http.get("api/category").pipe(
      map((response) => {
        const data = response as Category[];
        this.categoryList = data;
        return data;
      },
      (error) => console.log(error))
    );
  }

  getCategories() {
    return this.categoryList.slice();
  }

  selectCategory(cat_id: string) {
    const result = this.categoryList.find((elem) => {
      return (elem.cat_id === cat_id);
    });

    if (result != undefined) {
      this.categoryUpdated.emit(result);
    }
    return result;
  }
}
