import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Category } from './../../entities/category';
import { Card } from './../../entities/card';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})

export class DetailsPage {
  category: Category;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.category = this.navParams.get('category');
  }

  ionViewDidLoad() {

  }

  public addCards() {

  }

  public importCards() {

  }
}
