// Libraries
import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { Observable } from 'rxjs/Rx';
// Entities
import { Card } from '@entities/card';
import { Category } from '@entities/category';
import { Settings } from '@entities/settings';

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
  category: Category;
  flipped: boolean = false;
  cardState: string;
  clone: Card|null = null;
  sessionStart: Date = new Date();
  sessionEnd: boolean = false;
  original: Card;
  stats;
  settings: Settings|null = null;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams
  ) {
    this.category = this.navParams.get('category');
    this.stats = {
      total: this.category.cards.length,
      delta: 0,
      count: 0,
      card: null
    };
    Settings.findOne().then(res => {
      this.settings = res;
      this.cloneCard();
    });
  }

  public next(answer: boolean) {
    this.original.updateStats(answer);
    this.cardState = answer ? 'swipeRight' : 'swipeLeft';
    this.stats.delta = answer ? this.stats.delta + 1 : this.stats.delta - 1;
    this.stats.count++;

    Observable.interval(360).take(1).subscribe(() => {
      this.cloneCard();
      this.cardState = 'init';
    });
  }

  /**
   * Show in template only the cloned card to avoid changing
   * properties of original Card entity
   * @returns void
   */
  private cloneCard(): void {
    /**
     * Infinitely show new cards till user decides to quit
     * learning session manually
     */
    this.original = this.category.pickCard(this.settings.algorithmicLearning);
    this.clone = Object.assign({}, this.original);

    this.stats.card = {
      id: this.original.id,
      front: this.original.front,
      correct: this.original.correct,
      wrong: this.original.wrong,
      probability: this.original.rate,
      strikes: this.original.strike
    };

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
}
