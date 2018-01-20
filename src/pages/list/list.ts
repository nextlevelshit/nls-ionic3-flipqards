import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Category } from './../../entities/category';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  categories: Category[];
  count: number;

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.runDemo();
  }

  async runDemo() {
    this.categories = await Category.all();
  }

  categorySelected(e, name): void {
    alert(`Clicked on ${name}`);
  }

  addCategory(e) {
    alert(`Adding new category`);
  }
}
