import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
import { App  } from 'ionic-angular';
/**
 * Generated class for the UserInfoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {

  constructor(public navCtrl: NavController, public navParams: NavParams,private nativeStorage: NativeStorage,public app: App) {
  }
  public storedFactory;
  public storedUser;
  ngOnInit() {
       Promise.all([this.nativeStorage.getItem("factory"), this.nativeStorage.getItem("user")]).then(
        values => {
          this.storedFactory = values[0];
          this.storedUser = values[1];
        },
        error => this.storedFactory = null
      );

  }

  logoff() {
    Promise.all([this.nativeStorage.setItem("factory", null), this.nativeStorage.setItem("user", null)]).then(
      () => {//this.navCtrl.setRoot(LoginPage);
      // this.app.getRootNav().setRoot(LoginPage);
      this.app.getRootNavs()[0].push(LoginPage)
        },
      error => console.log(error));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInfoPage');
  }

}
