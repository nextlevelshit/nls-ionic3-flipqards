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
    await Category.find().then((res) => {
      this.loadedCategories = res;
    }, (err) => {
      console.error(err);
    });
  }

  categoryTapped(e, name): void {
    console.log(`Clicked on ${name}`);
  }
}
