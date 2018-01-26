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
      // state('show', style({
      //   transform: 'translate3d(0,0,0)',
      //   filter: 'blur(0)',
      //   opacity: 1
      // })),
      // state('swipeLeft', style({
      //   transform: 'translateX(-100%)',
      //   opacity: 0
      // })),
      transition(':enter', [
        style({
          transform: 'translate3d(0,0,-100vh)',
          filter: 'blur(10px)',
          opacity: 0
        }),
        animate(500, style({
          transform: 'translate3d(0,0,0)',
          filter: 'blur(0)',
          opacity: 1
        }))
      ]),
      transition(':leave', [
        style({
          transform: 'translate3d(0,0,-100vh)',
          filter: 'blur(10px)',
          opacity: 0
        }),
        animate(500, style({
          transform: 'translate3d(0,0,0)',
          filter: 'blur(0)',
          opacity: 1
        }))
      ]),
      transition('* => swipeRight', [
        style({
          transform: 'translate3d(0,0,0)',
          filter: 'blur(0)',
          opacity: 1
        }),
        animate(800, style({
          transform: 'translate3d(50vw,0,0)',
          filter: 'blur(10px)',
          opacity: 0
        }))
      ]),
      transition('* => swipeLeft', [
        style({
          transform: 'translate3d(0,0,0)',
          filter: 'blur(0)',
          opacity: 1
        }),
        animate(800, style({
          transform: 'translate3d(-50vw,0,0)',
          filter: 'blur(10px)',
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
  }

  public next(answer: boolean) {
    if (answer) {
      this.cardState = 'swipeRight';
      this.increaseCorrect(this.getCurrent());
    } else {
      this.increaseWrong(this.getCurrent());
      this.cardState = 'swipeLeft';
    }
    this.flipped = false;

    Observable.interval(1000).take(1).subscribe(() => {
      this.category.cards.shift();
      this.cardState = undefined;
    });
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
