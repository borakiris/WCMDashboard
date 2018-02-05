import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Badge } from '@ionic-native/badge';
import { FactoriesDataProvider } from './../../providers/factories-data/factories-data';
import { Observable } from 'rxjs/Observable';
import { Platform } from 'ionic-angular';
/*
  Generated class for the FirebaseNotificationProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class FirebaseNotificationProvider {

  constructor(private platform: Platform,private firebase: Firebase, private factoryProvider: FactoriesDataProvider, private badge: Badge) {
    console.log('Hello FirebaseNotificationProvider Provider');
  }
  /**
   * subscribeToNotification
   */
  public subscribeToNotification(factory:string) {

   let factories:Observable<any[]> = this.factoryProvider.getFactoriesObsv();
   factories.take(1).subscribe(factData => {
        factData.forEach(factoryInst => {
            console.log(factoryInst.Value)
            this.firebase.unsubscribe(factoryInst.Value);
        })
        this.platform.is('android') ? this.initializeFireBaseAndroid(factory) : this.initializeFireBaseIos(factory);
    });
  }

  private initializeFireBaseAndroid(factory:string): Promise<any> {
    return this.firebase.getToken()
        .catch(error => console.error('Error getting token', error))
        .then(token => {

            console.log(`The token is ${token}`);

            Promise.all([
                this.firebase.subscribe('firebase-app'),    // Subscribe to the entire app
                this.firebase.subscribe(factory),         // Subscribe to android users topic
                
            ]).then((result) => {
                if (result[0]) console.log(`Subscribed to FirebaseDemo`);
                if (result[1]) alert(`Subscribed to ` + factory);
                this.subscribeToPushNotificationEvents();
            });
        });
}

private initializeFireBaseIos(factory:string): Promise<any> {
    return this.firebase.grantPermission()
    
        .catch(error => console.error('Error getting permission', error))
        .then(() => {
            this.firebase.getToken()
                .catch(error => console.error('Error getting token', error))
                .then(token => {
                    console.log(`The token is ${token}`);
                    //this.fcm.subscribeToTopic('all');

                    Promise.all([
                        this.firebase.subscribe('firebase-app'),
                        this.firebase.subscribe(factory),
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
}
}
