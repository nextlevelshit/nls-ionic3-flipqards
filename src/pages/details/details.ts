// Libraries
import { Component } from '@angular/core';
import { NavController, NavParams, AlertController, ToastController, ActionSheetController, Platform } from 'ionic-angular';
import { File } from '@ionic-native/file';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import * as papa from 'papaparse';
// Entities
import { Category } from '@entities/category';
import { Card } from '@entities/card';
// Pages
import { AddPage } from '@pages/add/add';
import { EditPage } from '@pages/edit/edit';

@Component({
  selector: 'page-details',
  templateUrl: 'details.html'
})

export class DetailsPage {
  category: Category;
  import: Array<string>;
  cards: Card[]|null = null;

  constructor(
    public platform: Platform,
    public navCtrl: NavController,
    public navParams: NavParams,
    private file: File,
    private alertCtrl: AlertController,
    private actionSheetCtrl: ActionSheetController,
    private toastCtrl: ToastController,
    private fileChooser: FileChooser,
    private filePath: FilePath
  ) {
    this.category = this.navParams.get('category');
  }

  ionViewWillEnter() {
    this.updateCards();
  }

  public addCards() {
    this.navCtrl.push(AddPage, {category: this.category});
  }

  public importCards() {
    this.fileChooser.open()
      .then(uri => {
        console.log('file picked');
        this.filePath.resolveNativePath(uri)
          .then(filePath => {
            console.log('file path resolved');
            let fileDir = filePath.substring(0, filePath.lastIndexOf('/'));
            let fileName = filePath.substring(filePath.lastIndexOf('/') + 1, filePath.length);
            let fileType = fileName.substring(fileName.lastIndexOf('.') + 1, fileName.length);

            if (fileType === 'csv' || fileType === 'CSV') {
              this.file.readAsText(fileDir, fileName).then((csv) => {
                this.import = papa.parse(csv).data;

                this.alertCtrl.create({
                  title: 'Import fortsetzen?',
                  subTitle: `Es wurden ${this.import.length} Datensätze gefunden`,
                  buttons: [
                    {
                      text: 'Abbrechen',
                      role: 'cancel'
                    },
                    {
                      text: 'Importieren',
                      handler: () => {
                        this.startImport();
                      }
                    }
                  ]
                }).present();
              })
              .catch(err => console.error(err));
            } else {
              console.error('Wrong file format');
            }
          })
          .catch(err => console.error(err));
      })
      .catch(err => console.error(err));
  }

  private startImport() {
    if(this.import.length > 0) {
      console.log('importing file');

      Promise.all(this.import.map(async (card) => {
        if (card[0].length > 0 && card[1].length) {
          return new Card(card[0], card[1], this.category).save();
        }
      })).then((res) => {
        this.updateCards();
      });

      this.toastCtrl.create({
        message: `Erfolgreicher Import`,
        duration: 3000,
        position: 'bottom'
      }).present();

      this.updateCards();

      delete this.import;
    } else {
      this.toastCtrl.create({
        message: `Import fehlgeschlagen. Bitte nochmals versuchen`,
        duration: 3000,
        position: 'bottom'
      }).present();
    }
  }

  private updateCards() {
    Category.findOneById(this.category.id).then(res => {
      this.category = res;
    });
  }

  public cardSelected(card: Card) {
    this.actionSheetCtrl.create({
      title: 'Lernkarte bearbeiten',
      buttons: [
        {
          text: 'Bearbeiten',
          icon: !this.platform.is('ios') ? 'hammer' : null,
          handler: () => {
            this.navCtrl.push(EditPage, {card: card, category: this.category});
          }
        },{
          text: 'Löschen',
          icon: !this.platform.is('ios') ? 'trash' : null,
          handler: () => {
            this.alertCtrl.create({
              title: 'Lernkarte löschen',
              message: 'Bist du dir sicher? Die Karte wird unwiederbringlich gelöscht.',
              buttons: [
                {
                  text: 'Abbrechen',
                  role: 'cancel'
                },
                {
                  text: 'Löschen',
                  handler: () => {
                    card.remove().then(() => {
                      this.updateCards();
                      this.toastCtrl.create({
                        message: `Lernkarte erfolgreich gelöscht`,
                        duration: 3000,
                        position: 'bottom'
                      }).present();
                    });
                  }
                }
              ]
            }).present();
          }
        },{
          text: 'Abbrechen',
          icon: !this.platform.is('ios') ? 'close' : null,
          role: 'cancel'
        }
      ]
    }).present();
  }
}
