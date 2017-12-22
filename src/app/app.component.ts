import { LoginPage } from './../pages/login/login';
import { Component, Inject, ViewChild } from '@angular/core';
import { Platform, NavController, App, AlertController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { Nav } from 'ionic-angular/components/nav/nav';
import { Push, PushObject, PushOptions } from '@ionic-native/push';
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
    constructor(private platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, public push: Push
        , private nativeStorage: NativeStorage, public alertCtrl: AlertController,
        private firebase: Firebase, private factoryProvider: FactoriesDataProvider, private badge: Badge) {
        platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            platform.registerBackButtonAction(() => this.myHandlerFunction());
            statusBar.styleDefault();
            this.badge.clear();


            //   this.firebase.unsubscribe("Lahore");
            //   this.firebase.unsubscribe("Limburg");
            //   this.firebase.unsubscribe("Hohhot");
            //   this.firebase.unsubscribe("Izmir");
            //   this.firebase.unsubscribe("Rubiera");
            //   this.firebase.unsubscribe("Jeddah");


            this.nativeStorage.getItem("factory").then(ret => this.factory = ret)

            if (this.platform.is('cordova')) {
                // Initialize push notification feature

                this.factories = this.factoryProvider.getFactoriesObsv();
                this.factories.take(1).subscribe(factData => {
                    factData.forEach(factoryInst => {
                        console.log(factoryInst.Value)
                        this.firebase.unsubscribe(factoryInst.Value);
                    })
                    this.platform.is('android') ? this.initializeFireBaseAndroid() : this.initializeFireBaseIos();
                }
                )


            } else {
                console.log('Push notifications are not enabled since this is not a real device');
            }
            splashScreen.hide();
        });
    }

    private initializeFireBaseAndroid(): Promise<any> {
        return this.firebase.getToken()
            .catch(error => console.error('Error getting token', error))
            .then(token => {

                console.log(`The token is ${token}`);

                Promise.all([
                    this.firebase.subscribe('firebase-app'),    // Subscribe to the entire app
                    this.firebase.subscribe(this.factory),         // Subscribe to android users topic
                ]).then((result) => {
                    if (result[0]) console.log(`Subscribed to FirebaseDemo`);
                    if (result[1]) console.log(`Subscribed to ` + this.factory);
                    this.subscribeToPushNotificationEvents();
                });
            });
    }

    private initializeFireBaseIos(): Promise<any> {
        return this.firebase.grantPermission()
            .catch(error => console.error('Error getting permission', error))
            .then(() => {
                this.firebase.getToken()
                    .catch(error => console.error('Error getting token', error))
                    .then(token => {

                        console.log(`The token is ${token}`);

                        Promise.all([
                            this.firebase.subscribe('firebase-app'),
                            this.firebase.subscribe(this.factory),
                        ]).then((result) => {

                            if (result[0]) console.log(`Subscribed to FirebaseDemo`);
                            if (result[1]) console.log(`Subscribed to iOS`);

                            this.subscribeToPushNotificationEvents();
                        });
                    });
            })

    }

    private saveToken(token: any): Promise<any> {
        // Send the token to the server
        console.log('Sending token to the server...');
        return Promise.resolve(true);
    }

    private subscribeToPushNotificationEvents(): void {

        // Handle token refresh
        this.firebase.onTokenRefresh().subscribe(
            token => {
                console.log(`The new token is ${token}`);
                // this.saveToken(token);
            },
            error => {
                console.error('Error refreshing token', error);
            });

        // Handle incoming notifications
        this.firebase.onNotificationOpen().subscribe(
            (notification: NotificationModel) => {
                this.badge.increase(1);
                !notification.tap
                    ? console.log('The user was using the app when the notification arrived...')
                    : console.log('The app was closed when the notification arrived...');

                let notificationAlert = this.alertCtrl.create({
                    title: notification.title,
                    message: notification.body,
                    buttons: ['Ok']
                });
                notificationAlert.present();
            },
            error => {
                console.error('Error getting the notification', error);
            });
    }
    myHandlerFunction() {
        //create alert
    }

}
