import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { Card } from './../../entities/card';
import { Category } from './../../entities/category';
import { DetailsPage } from './../details/details';
import { LearningPage } from './../learning/learning';
import { Settings } from './../../entities/settings';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  categories: Category[];
  count: number;
  settings: Settings|null = null;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {
    Category.all().then(res => {
      this.categories = res;
    });
    Settings.findOne().then(res => {
      this.settings = res;
    });
  }

  ionViewDidLoad() {
    Card.find().then(cards => {
      console.log(cards)
    });
  }

  public categorySelected(e, id) {
    Category.findOneById(id).then(category => {
      this.navCtrl.push(LearningPage, {category: category});
    });
  }

  public editCategory(e, category) {
    this.navCtrl.push(DetailsPage, {category: category});
  }

  public addCategory(message?) {
    this.alertCtrl.create({
      title: 'Neue Kategorie',
      subTitle: message ? message : '',
      inputs: [
        {
          name: 'name',
          placeholder: 'Kategorie'
        }
      ],
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel'
        },
        {
          text: 'Hinzufügen',
          handler: data => {
            if (Category.isValid(data.name)) {
              new Category(data.name).save().then(result => {
                this.updateCategories();
                this.toastCtrl.create({
                  message: `${data.name} wurde hinzugefügt`,
                  duration: 3000,
                  position: 'bottom'
                }).present();
              });
            } else {
              this.addCategory('Ungültiger Name');
            }
          }
        }
      ]
    }).present();
  }

  private async updateCategories() {
    this.categories = await Category.all();
  }
}
