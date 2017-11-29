import { MaintenancePage } from './../pages/maintenance/maintenance';
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';

import { WastePage } from '../pages/waste/waste';
import { FIPage } from '../pages/fi/fi';
import { TabsPage } from '../pages/tabs/tabs';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { DashboardDataProvider } from '../providers/dashboard-data/dashboard-data';
import { ComponentsModule } from './../components/components.module';
import { OtherDataPage } from './../pages/other/other';

const firebaseConfig = {
  apiKey: 'AIzaSyA5W9Tjx0iBdM8vWal_BSCo-ep5T39Q2vA',
  authDomain: 'testdashboard-6c67a.firebaseapp.com',
  databaseURL: 'https://testdashboard-6c67a.firebaseio.com',
  projectId: 'testdashboard-6c67a',
  storageBucket: 'testdashboard-6c67a.appspot.com',
  messagingSenderId: '426198085892'
};
@NgModule({
  declarations: [
    MyApp,
    WastePage,
    MaintenancePage,
    FIPage,
    OtherDataPage,
    TabsPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    AngularFireModule.initializeApp(firebaseConfig), AngularFireDatabaseModule,
    ComponentsModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WastePage,
    MaintenancePage,
    FIPage,
    OtherDataPage,
    TabsPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DashboardDataProvider
  ]
})
export class AppModule { }
