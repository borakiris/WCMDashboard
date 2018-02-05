import { UserInfoPage } from './../pages/user-info/user-info';
import { FactoriesDataProvider } from './../providers/factories-data/factories-data';
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
import { LoginPage } from './../pages/login/login';
import { NativeStorage } from '@ionic-native/native-storage';
import { Platform } from 'ionic-angular'
//import { Push} from '@ionic-native/push';
import { Firebase } from '@ionic-native/firebase';
import { Badge } from '@ionic-native/badge';
import { FirebaseNotificationProvider } from '../providers/firebase-notification/firebase-notification';
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
    TabsPage,
    LoginPage,
    UserInfoPage
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
    TabsPage,
    LoginPage,
    UserInfoPage
  ],
  providers: [
    StatusBar,NativeStorage,
    SplashScreen,
    { provide: ErrorHandler, useClass: IonicErrorHandler },
    DashboardDataProvider,FactoriesDataProvider,Firebase,Badge,
    FirebaseNotificationProvider
  ]
})
export class AppModule { }
