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
  algorithmicLearning: false;
  sessionEnd: false;
  original: Card;

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
      this.increaseCorrect(this.original);
    } else {
      this.increaseWrong(this.original);
      this.cardState = 'swipeLeft';
    }

    if(!this.algorithmicLearning) {
      this.category.cards.shift();
    }

    Observable.interval(360).take(1).subscribe(() => {
      this.cloneCard();
      this.cardState = 'init';
    });
  }

  /**
   * Show in template only the cloned card to avoid changing
   * properties of original Card entity
   */
  private cloneCard(): void {
    this.original = this.category.cards[0];
    this.clone = Object.assign({}, this.original);

    /**
     * Infinitely show new cards till user decides to quit
     * learning session manually
     */
    if(this.algorithmicLearning) {

    }

    /**
     * Switch backside and frontside if card has been flipped to show
     * frontside always at first after animations
     * TODO: Add own function
     */
    if(this.flipped && this.clone) {
      this.clone.front = this.original.back;
      this.clone.back = this.original.front;
    }

  }

  /**
   * Increase the amount of correctly answered Card and save
   * to database
   * @param card
   * TODO: Move to Card entity
   */
  public increaseCorrect(card: Card) {
    this.run.correct += 1;
    card.correct += 1;
    card.save();
  }

  /**
   * Increase the amount of wrongly answered Card and save
   * to database
   * @param card
   * TODO: Move to Card entity
   */
  public increaseWrong(card: Card) {
    this.run.wrong += 1;
    card.wrong += 1;
    card.save();
  }
}
