import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ErrorHandler, NgModule } from '@angular/core';
import { FileChooser } from '@ionic-native/file-chooser';
import { FilePath } from '@ionic-native/file-path';
import { File } from '@ionic-native/file';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';

import { DetailsPage } from './../pages/details/details';
import { EditPage } from './../pages/edit/edit';
import { HomePage } from '../pages/home/home';
import { LearningPage } from './../pages/learning/learning';
import { ListPage } from '../pages/list/list';
import { MarkdownPipe } from './../pipes/markdown.pipe';


@NgModule({
  declarations: [
    MyApp,
    DetailsPage,
    EditPage,
    HomePage,
    LearningPage,
    ListPage,
    MarkdownPipe
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    DetailsPage,
    EditPage,
    HomePage,
    ListPage,
    LearningPage
  ],
  providers: [
    File,
    FileChooser,
    FilePath,
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ]
})
export class AppModule {}
