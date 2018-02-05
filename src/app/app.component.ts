import { FirebaseNotificationProvider } from './../providers/firebase-notification/firebase-notification';
import { LoginPage } from './../pages/login/login';
import { Component, Inject, ViewChild } from '@angular/core';
import { Platform, NavController, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { Nav } from 'ionic-angular/components/nav/nav';
//import { Push, PushObject, PushOptions } from '@ionic-native/push';
import { Firebase } from '@ionic-native/firebase';
import { NativeStorage } from '@ionic-native/native-storage';
import { FactoriesDataProvider } from './../providers/factories-data/factories-data';
import { Observable } from 'rxjs/Observable';
import { Badge } from '@ionic-native/badge';
export class NotificationModel {
    public body: string;
    public title: string;
    public tap: boolean
}
@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    @ViewChild('myNav') nav
    rootPage: any = LoginPage;
    factory: string;
    factories: Observable<any[]>;
    constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private nativeStorage: NativeStorage, public alertCtrl: AlertController,
        private firebase: Firebase, private factoryProvider: FactoriesDataProvider, private badge: Badge,public notificationProvider:FirebaseNotificationProvider) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            platform.registerBackButtonAction(() => this.myHandlerFunction());
            statusBar.styleDefault();
            this.badge.clear();
            this.nativeStorage.getItem("factory").then(ret => this.factory = ret)
            if (this.platform.is('cordova')) {
                // Initialize push notification feature
                this.notificationProvider.subscribeToNotification(this.factory);
            } else {
                console.log('Push notifications are not enabled since this is not a real device');
            }
            splashScreen.hide();
        });
    }
    myHandlerFunction() {
        //create alert
    }

}
