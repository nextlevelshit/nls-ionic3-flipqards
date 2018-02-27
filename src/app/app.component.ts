import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { createConnection } from 'typeorm';

import { ENV } from '@env';
import { HomePage } from '@pages/home/home';
import { ListPage } from '@pages/list/list';
import { Card } from '@entities/card';
import { Category } from '@entities/category';
import { MockCards, MockCategories } from '@mock';
import { Settings } from '@entities/settings';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = HomePage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public statusBar: StatusBar,
    public splashScreen: SplashScreen
  ) {
    this.initializeApp();
    this.splashScreen.show();
    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Übersicht', component: HomePage },
      { title: 'Kategorien', component: ListPage },
    ];
  }

  initializeApp() {

    // console.log(ENV);

    this.platform.ready().then(async () => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleLightContent();
      this.statusBar.backgroundColorByHexString('#9d1141');
      // TODO: use overlay webview, though add padding to toolbar and navbar
      // this.statusBar.overlaysWebView(true);

      if(this.platform.is('cordova')) {
        await createConnection(ENV.connection.cordova).then((connection) => {
          Settings.findOne()
            .then(res => {
              if(!res) {
                new Settings().save()
                  .then(res => {
                    this.nav.setRoot(ListPage);
                  }).catch(err => {
                    console.error(err);
                  });
              } else {
                this.nav.setRoot(ListPage);
              }
            }).catch(err => {
              console.log(err);
            });
        });
      } else {
        await createConnection(ENV.connection.sqljs).then(connection => {
          Settings.findOne()
            .then(res => {
              if(!res) {
                new Settings().save()
                  .then(res => {
                    this.nav.setRoot(ListPage);
                  }).catch(err => {
                    console.error(err);
                  });
              } else {
                this.nav.setRoot(ListPage);
              }
            }).catch(err => {
              console.log(err);
            });
        });
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  private installMocks() {
    Promise.all(MockCategories.map(async (category) => {
      return new Category(category).save();
    })).then((res) => {
      Promise.all(MockCards.map(async (card) => {
        return new Card(card[0], card[1], res[0]).save();
      })).then(res => {
        this.nav.setRoot(ListPage);
      });
    });
  }

  private checkForCategories() {
    Category.find()
      .then(res => {
        if(res.length > 0) {
          this.nav.setRoot(ListPage);
        } else {
          this.installMocks();
        }
      })
      .catch(err => {
        console.error(err);
      });
  }
}
