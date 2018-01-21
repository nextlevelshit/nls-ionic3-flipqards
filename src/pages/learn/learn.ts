import { Category } from './../../entities/category';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-learn',
  templateUrl: 'learn.html',
})
export class LearnPage {
  category: Category = this.navParams.get('category');

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

  }

  ionViewDidLoad() {
    console.log('Learn page loaded');
  }

}
