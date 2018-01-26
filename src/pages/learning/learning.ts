import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';

import { Category } from './../../entities/category';
import { Card } from './../../entities/card';
import { Observable } from 'rxjs/Rx';

@IonicPage()
@Component({
  selector: 'page-learning',
  templateUrl: 'learning.html',
  animations: [
    trigger('card', [
      state('init', style({
        transform: 'none',
        opacity: 1
      })),
      state('swipeLeft', style({
        transform: 'translate3d(0,2vh,-16vh) rotateX(13deg)',
        opacity: 0
      })),
      state('swipeRight', style({
        transform: 'translate3d(0,2vh,-16vh) rotateX(13deg)',
        opacity: 0
      })),
      transition('* => init, :enter', [
        style({
          transform: 'translate3d(0,2vh,-16vh) rotateX(13deg)',
          opacity: 0
        }),
        animate('220ms cubic-bezier(.65,.30,.8,.9)', style({
          transform: 'none',
          opacity: 1
        }))
      ]),
      transition('* => swipeRight', [
        animate('280ms ease-in', style({
          transform: 'translate3d(20vw,0,0) rotateY(-30deg)',
          opacity: 0
        }))
      ]),
      transition('* => swipeLeft', [
        animate('280ms ease-in', style({
          transform: 'translate3d(-20vw,0,0) rotateY(30deg)',
          opacity: 0
        }))
      ])
    ])
  ]
})
export class LearningPage {
  category: Category = this.navParams.get('category');
  cards: Card[];
  run;
  flipped: boolean = false;
  cardState: string;
  active: boolean = true;
  clone: Card;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.cloneCard();
  }

  ionViewDidLoad() {
    this.run = {
      wrong: 0,
      correct: 0,
      total: this.category.cards.length
    };
  }

  public next(answer: boolean) {
    if (answer) {
      this.cardState = 'swipeRight';
      this.increaseCorrect(this.category.cards[0]);
    } else {
      this.increaseWrong(this.category.cards[0]);
      this.cardState = 'swipeLeft';
    }

    Observable.interval(360).take(1).subscribe(() => {
      this.category.cards.shift();
      this.cloneCard();
      this.cardState = 'init';
    });
  }

  private cloneCard() {
    let currentCard = this.category.cards[0];
    this.clone = Object.assign({}, currentCard);

    console.log(this.clone);

    if (this.flipped) {
      this.clone.front = currentCard.back;
      this.clone.back = currentCard.front;
    }
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
