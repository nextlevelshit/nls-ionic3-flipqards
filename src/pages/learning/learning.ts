import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Category } from './../../entities/category';
import { Card } from './../../entities/card';

@IonicPage()
@Component({
  selector: 'page-learning',
  templateUrl: 'learning.html',
})
export class LearningPage {
  category: Category = this.navParams.get('category');
  cards: Card[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

  }

  ionViewDidLoad() {
    Card.find().then(cards => {
      cards.forEach((card) => {
        console.log(card.front, card.views());
      });
    });
  }

  public increaseCorrect(card: Card) {
    card.correct += 1;
    card.save();
  }
}
