import { LoginPage } from './../pages/login/login';
import { Component,Inject,ViewChild } from '@angular/core';
import { Platform,NavController,App } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { TabsPage } from '../pages/tabs/tabs';
import { Nav } from 'ionic-angular/components/nav/nav';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild('myNav') nav
  rootPage:any = LoginPage;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen) {
    platform.ready().then(() => {
      // Okay, so the platform is ready and our plugins are available.
      // Here you can do any higher level native things you might need.
      platform.registerBackButtonAction(()=>this.myHandlerFunction());
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  myHandlerFunction(){
    //create alert
     }

}
