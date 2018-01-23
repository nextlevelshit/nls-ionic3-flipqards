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
  run;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {

  }

  ionViewDidLoad() {
    this.run = {
      wrong: 0,
      correct: 0,
      total: this.category.cards.length
    };

    console.log(this.category.cards);
  }

  public next(answer: boolean) {
    if (answer) {
      this.increaseCorrect(this.getCurrent());
    } else {
      this.increaseWrong(this.getCurrent());
    }
    this.category.cards.shift();
  }

  public getCurrent() {
    return this.category.cards[0];
  }

  public increaseCorrect(card: Card) {
    this.run.correct += 1;
    card.correct += 1;
    card.save();
  }

  public increaseWrong(card: Card) {
    this.run.wrong += 1;
    card.wrong += 1;
    card.save();
  }
}
