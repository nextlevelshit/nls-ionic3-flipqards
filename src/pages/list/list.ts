import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
// import { getRepository, Repository } from 'typeorm';

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

    this.loadedCategories = await Category.find();

    console.log(this.loadedCategories);
  }

  categoryTapped(e, name): void {
    console.log(`Clicked on ${name}`);
  }
}
