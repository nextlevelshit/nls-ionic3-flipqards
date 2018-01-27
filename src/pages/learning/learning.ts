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
  flipped: boolean = false;
  cardState: string;
  clone: Card;
  algorithmicLearning: boolean = true;
  sessionStart: Date = new Date();
  sessionEnd: boolean = false;
  original: Card;
  stats;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.cloneCard();
  }

  ionViewDidLoad() {
    this.stats = {
      wrong: 0,
      correct: 0,
      total: this.category.cards.length,
      sessions: 0
    };
  }

  public next(answer: boolean) {
    this.original.updateStrike(answer);

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


    /**
     * Infinitely show new cards till user decides to quit
     * learning session manually
     */
    if(this.algorithmicLearning) {
      let sortedCards = this.category.cards.filter((a) => {
        return this.sessionStart.getTime() > a.updated_at.getTime();
      });

      if(sortedCards.length <= 0) {
        sortedCards = this.category.cards;
        this.stats.sessions += 1;
        this.sessionStart = new Date();
      }

      sortedCards.sort((a, b) => {
        return a.strike - b.strike;
      });

      this.original = sortedCards[0];
    } else {
      this.original = this.category.cards[0];
    }

    this.clone = Object.assign({}, this.original);

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
    this.stats.correct += 1;
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
    this.stats.wrong += 1;
    card.wrong += 1;
    card.save();
  }
}
