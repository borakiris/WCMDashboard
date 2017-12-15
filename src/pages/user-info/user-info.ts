import { LoginPage } from './../login/login';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NativeStorage } from '@ionic-native/native-storage';
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

  constructor(public navCtrl: NavController, public navParams: NavParams,private nativeStorage: NativeStorage) {
  }
  public storedFactory;
  public storedUser;
  ngOnInit() {
   

       Promise.all([this.nativeStorage.getItem("factory"), this.nativeStorage.getItem("user")]).then(
        values => {
          
          this.storedFactory = values[0];
          this.storedUser = values[1];
          console.log("Stored Factory---:" + this.storedFactory)
        },
        error => this.storedFactory = null
      );

  }

  logoff() {
    console.log("Logoff clicked")
    Promise.all([this.nativeStorage.setItem("factory", null), this.nativeStorage.setItem("user", null)]).then(
      () => {this.navCtrl.setRoot(LoginPage);
        this.navCtrl.popToRoot();
        console.log("Logoff pop To Root");},
      error => console.log(error));
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserInfoPage');
  }

}