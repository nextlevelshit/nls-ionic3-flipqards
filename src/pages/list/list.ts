import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { Category } from './../../entities/category';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  loadedCategories: Category[];
  sampleCategories: Array<string> = ['Geschichte im Überblick', 'Philosophie'];

  constructor(public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.runDemo();
  }

  async runDemo() {

    const category = new Category();
    category.name = 'Geschichte';
    category.save();

    await Category.find().then((r) => {
      console.error(r);
    }, (e) => {
      console.error(e);
    });

    // console.warn(this.loadedCategories);
  }

  categoryTapped(e, name): void {
    console.log(`Clicked on ${name}`);
  }
}
