import { Component, OnInit } from '@angular/core';
import { Category } from '../shared/model/category.model';
import { CategoryService } from '../shared/service/category.service';

@Component({
  selector: 'app-collection',
  templateUrl: './collection.component.html',
  styleUrls: ['./collection.component.css']
})
export class CollectionComponent implements OnInit {
  categoryName = "";

  constructor(private categorySrv: CategoryService) { }

  ngOnInit() {
    this.categorySrv.categoryUpdated
      .subscribe(
        (categorySelected: Category) => {
          this.categoryName = categorySelected.cat_name;
        }
      );
  }

}
