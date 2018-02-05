import { FirebaseNotificationProvider } from './../../providers/firebase-notification/firebase-notification';
import { IEmployee } from './../../classes/IEmployee';
import { FactoriesDataProvider } from './../../providers/factories-data/factories-data';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { DashboardDataProvider } from './../../providers/dashboard-data/dashboard-data';
import { NativeStorage } from '@ionic-native/native-storage';
import { Platform } from 'ionic-angular'
import { App } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  factorySelected: boolean = false;
  factories: Observable<{}[]>;
  users: Observable<IEmployee[]>;
  selectedFactory: string;
  userPassword: string;
  selectedUser: IEmployee;
  password: string;
  error: string;
  storedFactory;
  storedUser;
  loginShouldShow: boolean;
  data: Observable<{}[]>;
  constructor(private nav: NavController, public navParams: NavParams, private factoryProvider: FactoriesDataProvider,
    private dBoardProvider: DashboardDataProvider, private nativeStorage: NativeStorage, private platform: Platform, public app: App,
  public notificationProvider:FirebaseNotificationProvider) {
    this.factories = this.factoryProvider.getFactoriesObsv();
    this.loginShouldShow=false;
  }


  ngOnInit() {

    this.storedUser = null;
    this.storedFactory = null;

    this.platform.ready().then(

      () => Promise.all([this.nativeStorage.getItem("factory"), this.nativeStorage.getItem("user")]).then(
        values => {

          this.storedFactory = values[0];
          this.storedUser = values[1];
          console.log("Stored Factory login:" + this.storedFactory)
          console.log("Stored User:" + this.storedUser)
        },
        error => {
        this.storedFactory = null;
          this.storedUser = null;
        }
      ).then(
        () => {
          if (this.storedFactory != null) {
            this.users = this.dBoardProvider.getDashboardUsersForFactoryObsv(this.storedFactory);
            this.users.forEach(element => {
              element.forEach(element2 => {
                this.dBoardProvider.personnel.push(Object.assign({}, element2))
              });
            });
            this.dBoardProvider.getDashboardDataForFactory(this.storedFactory);
            this.dBoardProvider.dashboardDataBS.subscribe(dData => {
              let userControl: boolean;
              Promise.all([this.nativeStorage.getItem("factory"), this.nativeStorage.getItem("user")]).then(
                values => {

                  this.storedUser = values[1];

                  var loginFound: boolean = false;
                  this.dBoardProvider.personnel.forEach((per) => {
                    if (per.Kod === this.storedUser) {
                      loginFound = true;
                      this.nav.push(TabsPage)
                    }
                  });
                  console.log("login found:" + loginFound);
                  if (!loginFound) {
                    console.log("login not found")
                    this.loginShouldShow=true
                  } else {
                    this.storedFactory = values[0];
                  }
                },
                error => {
                this.storedFactory = null;
                  this.storedUser = null;
                }
              )
            });
          }else{
            this.loginShouldShow=true
          }
        }
        ));

  }
  ionViewDidLoad() {
    console.log("Load:" + this.factories)
    if (this.factories) {
      // this.isLoading=false;
    }
  }
  getStoredValues() {
    Promise.all([this.nativeStorage.getItem("factory"), this.nativeStorage.getItem("user")]).then(
      values => {

        this.storedFactory = values[0];
        this.storedUser = values[1];
        console.log("Stored Factory login:" + this.storedFactory)
        console.log("Stored User:" + this.storedUser)
      },
      error => {
      this.storedFactory = null;
        this.storedUser = null;
      }
    )
  }
  login() {
    if (this.password == this.selectedUser.Value) {
      this.nativeStorage.setItem("factory", this.selectedFactory).then(
        () => console.log('Stored Factory item!'),
        error => console.log(error));
      this.nativeStorage.setItem("user", this.selectedUser.Kod).then(
        () => console.log('Stored User item!'),
        error => console.log(error));
      this.notificationProvider.subscribeToNotification(this.selectedFactory);
      this.nav.push(TabsPage);
    } else {
      this.error = "Wrong Password";
      this.password = "";
    }
    // this.nav.push(TabsPage);
  }

  onFactoryChange($event) {
    this.dBoardProvider.getDashboardDataForFactory(this.selectedFactory);
    // this.dBoardProvider.getUsersDataForFactory(this.selectedFactory);
    this.users = this.dBoardProvider.getDashboardUsersForFactoryObsv(this.selectedFactory);
    this.factorySelected = true;
    this.getStoredValues();
  }

  backClicked() {
    this.factorySelected = false;
    this.selectedFactory = "";
  }
  passwordClick() {
    this.error = ""
  }

}
