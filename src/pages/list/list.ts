
import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';

import { Category } from './../../entities/category';
import { LearningPage } from './../learning/learning';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  categories: Category[];
  count: number;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController
  ) {

  }

  ionViewDidLoad() {
    this.runDemo();
  }

  async runDemo() {
    this.categories = await Category.all();
  }

  categorySelected(e, id) {
    Category.findOneById(id).then(category => {
      this.navCtrl.push(LearningPage, {category: category});
    });
  }

  addCategory(message?) {
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

  async updateCategories() {
    this.categories = await Category.all();
  }
}
