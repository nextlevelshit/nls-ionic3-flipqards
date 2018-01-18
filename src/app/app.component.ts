import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { createConnection } from 'typeorm'

import { HomePage } from '../pages/home/home';
import { ListPage } from '../pages/list/list';
import { Category } from '../entities/category';

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
      { title: 'Home', component: HomePage },
      { title: 'List', component: ListPage }
    ];

  }

  initializeApp() {
    this.platform.ready().then(async () => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      let connection;

      // if (window.cordova) {
        // running on device/emulator
        connection = await createConnection({
          type: 'cordova',
          database: 'test',
          location: 'default',
          logging: ['error', 'query', 'schema'],
          synchronize: true,
          entities: [
            Category
          ]
        });
      // } else {
      //   // running in dev mode
      //   connection = await createConnection({
      //     type: 'websql',
      //     database: 'testing',
      //     version: '1',
      //     description: 'test database',
      //     size: 2 * 1024 * 1024,
      //     entities: [
      //       Category
      //     ],
      //     logging: true,
      //     synchronize: true
      //   });
      // }

      // await createConnection({
      //   type: 'cordova',
      //   database: 'test',
      //   location: 'default',
      //   logging: ['error', 'query', 'schema'],
      //   synchronize: true,
      //   entities: [
      //     // Author,
      //     // Category,
      //     // Post
      //   ]
      // });
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
