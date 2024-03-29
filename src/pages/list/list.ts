// Libraries
import { SplashScreen } from '@ionic-native/splash-screen';
import { AlertController } from 'ionic-angular';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ToastController } from 'ionic-angular';
import { ENV } from '@env';
// Entities
import { Category } from '@entities/category';
import { Settings } from '@entities/settings';
// Pages
import { DetailsPage } from '@pages/details/details';
import { LearningPage } from '@pages/learning/learning';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {
  categories: Category[];
  count: number;
  settings: Settings|null = null;
  env: Object = ENV;

  constructor(
    public navCtrl: NavController,
    private alertCtrl: AlertController,
    private toastCtrl: ToastController,
    private splashScreen: SplashScreen
  ) {
    Settings.findOne().then(res => {
      this.settings = res;
    });
  }

  ionViewWillEnter() {
    // this.splashScreen.show();
    this.splashScreen.hide();
    this.getCategories();
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
      message: message ? message : 'Füge eine neue Lernkategorie hinzu.',
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
                this.getCategories();
                this.toastCtrl.create({
                  message: `${data.name} wurde hinzugefügt`,
                  duration: 3000,
                  position: 'bottom'
                }).present();
              });
            } else {
              this.addCategory('Die Kategorie sollte mindestens 3 Zeichen umfassen.');
            }
          }
        }
      ]
    }).present();
  }

  public resetDatabase() {
    this.confirmAction(
      `Datenbank zurücksetzen?`,
      `Soll die Datenbank wirklich unwiederbringlich gelöscht werden?`,
      function() {
        console.log('Going to reset db');
      }
    );
  }

  public loadDummyData() {
    this.confirmAction(
      `Mit Dummydaten überschreiben?`,
      `Soll deine Datenbank wirklich mit Dummydaten überschrieben werden?`,
      function() {
        console.log('Loading dummy data');
      }
    );
  }

  public sendBugReport() {
    this.confirmAction(
      `Fehlerbericht senden?`,
      `Sollen alle bisher aufgetretenen Fehler an die EntwicklerInnen der App gesendet werden?`,
      function() {
        console.log('Sending bug report');
      }
    );
  }

  public confirmAction(title, msg, fn) {
    this.alertCtrl.create({
      title: title,
      message: msg,
      buttons: [
        {
          text: 'Abbrechen',
          role: 'cancel'
        },
        {
          text: 'Ok',
          handler: () => {
            fn();
          }
        }
      ]
    }).present();
  }

  private getCategories() {
    Category.find().then(res => {
      this.categories = res;
    });
  }
}
