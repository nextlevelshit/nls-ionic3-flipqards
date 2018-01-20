import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { createConnection } from 'typeorm'

import { HomePage } from './../pages/home/home';
import { ListPage } from './../pages/list/list';
import { Category } from './../entities/category';

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

    // used for an example of ngFor and navigation
    this.pages = [
      { title: 'Lernen', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {

    this.platform.ready().then(async () => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      if(this.platform.is('cordova')) {
        await createConnection({
          type: 'cordova',
          location: 'default',
          database: 'nls-flipcards',
          description: 'Production Database for NLS Flipcards',
          logging: true,
          synchronize: true,
          entities: [
            Category
          ],
          dropSchema: true
        }).then((connection) => {
          ['Türkisch', 'Geschichte', 'Coding'].forEach(item => {
            new Category(item).save();
          });
        });
      } else {
        await createConnection({
          type: 'websql',
          database: 'nls-flipcards',
          description: 'Development Database for NLS Flipcards',
          version: '1',
          size: 2097152,
          logging: true,
          synchronize: true,
          entities: [
            Category
          ],
          dropSchema: true
        }).then(connection => {
          console.log(connection);
          this.openPage(ListPage);
        });
      }
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
