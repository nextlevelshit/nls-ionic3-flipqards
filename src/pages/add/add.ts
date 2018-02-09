// Libraries
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform } from 'ionic-angular';
// Entities
import { Card } from '@entities/card';
import { Category } from '@entities/category';

@Component({
  selector: 'page-add',
  templateUrl: 'add.html'
})

export class AddPage {
  card: Card;
  category: Category;
  returnAfterSave: boolean = false;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController
  ) {
    this.category = this.navParams.get('category');
    this.resetCard();
  }

  private resetCard() {
    this.card = new Card('', '', this.category);
  }

  public clickedSave() {
    if(this.card.isValid) {
      this.card.save().then(res => {
        this.resetCard();

        this.toastCtrl.create({
          message: `Lernkarte gespeichert.`,
          duration: 3000,
          position: 'bottom'
        }).present();

        if (!this.returnAfterSave) {
          this.navCtrl.pop();
        }
      });
    } else {
      this.toastCtrl.create({
        message: `Lernkarte konnte nicht gespeichert werden. Beide Felder müssen ausgefüllt sein.`,
        duration: 3000,
        position: 'bottom'
      }).present();
    }
  }
}
