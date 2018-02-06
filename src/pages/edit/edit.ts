import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ActionSheetController, Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';

import { Card } from './../../entities/card';
import { Category } from './../../entities/category';
import { DetailsPage } from './../details/details';

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
    private alertCtrl: AlertController,
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

  public save() {
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
