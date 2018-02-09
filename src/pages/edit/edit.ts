// Libraries
import { Component } from '@angular/core';
import { NavController, NavParams, ToastController, Platform } from 'ionic-angular';
// Entities
import { Card } from '@entities/card';
import { Category } from '@entities/category';

@Component({
  selector: 'page-edit',
  templateUrl: 'edit.html'
})

export class EditPage {
  import: Array<string>;
  card: Card;
  category: Category;
  changed: boolean = false;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private toastCtrl: ToastController,
  ) {
    this.card = this.navParams.get('card');
    this.category = this.navParams.get('category');
  }

  // TODO: Request for confirmation BEFORE user exits this view
  // ionViewWillUnload() {
  //   if(this.changed) {
  //     this.alertCtrl.create({
  //       title: 'Wirklich schließen?',
  //       message: 'Deine Änderung gehen verloren, wenn du sie nicht vorher abspeicherst',
  //       buttons: [
  //         {
  //           text: 'Nicht speichern',
  //           handler: () => {
  //             this.goBack();
  //           }
  //         },
  //         {
  //           text: 'Abbrechen',
  //           role: 'cancel'
  //         },
  //         {
  //           text: 'Speichern',
  //           handler: () => {
  //             this.changed = false;
  //             this.save();
  //           }
  //         }
  //       ]
  //     }).present();
  //   }
  // }

  private goBack() {
    this.navCtrl.pop();
  }

  public clickedSave() {
    if(this.card.isValid) {
      this.card.save().then(res => {
        this.goBack();
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
