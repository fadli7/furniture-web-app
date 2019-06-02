import { Injectable } from '@angular/core';
import { Furniture } from '../model/furniture.model';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FurnitureService {
  private furnitureList: Furniture [] = [];

  constructor(private http: HttpClient) { }

  loadFurniture(cat_id: string) {
    return this.http.get('/api/category/' + cat_id + '/furniture').pipe(
      map((response) => {
        let data = response as Furniture[];
        for (let elem of data) {
          elem.images = (elem.images as any).split(",");
        }
        this.furnitureList = data;
        return data;
      },
      (error) => console.log(error))
    );
  }

  getAllFurniture() {
    return this.furnitureList.slice();
  }

  getFurniture(it_id) {
    const result = this.furnitureList.find(
      (elem) => {
        return (elem.it_id == it_id);
      });
      return result;
  }
}
