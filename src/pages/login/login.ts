import { IEmployee } from './../../classes/IEmployee';
import { FactoriesDataProvider } from './../../providers/factories-data/factories-data';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { DashboardDataProvider } from './../../providers/dashboard-data/dashboard-data';
import { NativeStorage } from '@ionic-native/native-storage';
import { Platform } from 'ionic-angular'
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
  factories: string[];
  users: IEmployee[];
  selectedFactory: string;
  isLoading: boolean = true;
  userPassword: string;
  selectedUser: IEmployee;
  password: string;
  error: string;
  storedFactory;
  storedUser;
  constructor(private nav: NavController, public navParams: NavParams, private factoryProvider: FactoriesDataProvider,
    private dBoardProvider: DashboardDataProvider, private nativeStorage: NativeStorage, private platform: Platform) {
  }

  ngOnInit() {
    console.log("Inıt:" + this.storedUser)
this.storedUser=null;
this.storedFactory=null;
    this.isLoading = false;
    this.platform.ready().then(
      () => Promise.all([this.nativeStorage.getItem("factory"), this.nativeStorage.getItem("user")]).then(
        values => {
          console.log("Values:" + values)
          this.storedFactory = values[0];
          this.storedUser = values[1];
          console.log("Stored Factory login:" + this.storedFactory)
          console.log("Stored User:" + this.storedUser)
        },
        error => {this.storedFactory = null;
          this.storedUser=null;}
      ).then(
        () => {
          if (this.storedFactory == null) {
            this.isLoading = true;
            this.factoryProvider.factoriesObsv.subscribe(() => {
              this.factories = this.factoryProvider.factories;
              console.log(this.factories);
              () => this.isLoading = true;
            });
          } else {
            this.dBoardProvider.getDashboardDataAndUsersForFactory(this.storedFactory);
            this.dBoardProvider.dashboardDataBS.subscribe(dData => {
              let userControl: boolean;
              Promise.all([this.nativeStorage.getItem("factory"), this.nativeStorage.getItem("user")]).then(
                values => {
                  console.log("Values:" + values)
                  this.storedFactory = values[0];
                  this.storedUser = values[1];
                  console.log("Stored Factory login:" + this.storedFactory)
                  console.log("Stored User:" + this.storedUser)
                },
                error => {this.storedFactory = null;
                  this.storedUser=null;}
              ).then(() =>{
                this.dBoardProvider.personnel.forEach((per) => {
                  console.log("per:" + per.Kod + "- Stored User:" + this.storedUser)
                  if(per.Kod === this.storedUser){
                    this.nav.push(TabsPage)
                }
                });
              })
           
            });
          }
        }
        ));

  }
  ionViewDidLoad() {

  }
  getStoredValues(){
    Promise.all([this.nativeStorage.getItem("factory"), this.nativeStorage.getItem("user")]).then(
      values => {
        console.log("Values:" + values)
        this.storedFactory = values[0];
        this.storedUser = values[1];
        console.log("Stored Factory login:" + this.storedFactory)
        console.log("Stored User:" + this.storedUser)
      },
      error => {this.storedFactory = null;
        this.storedUser=null;}
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
      this.nav.push(TabsPage);
    } else {
      this.error = "Wrong Password";
      this.password = "";
    }
    // this.nav.push(TabsPage);
  }

  onFactoryChange($event) {
    this.dBoardProvider.getDashboardDataAndUsersForFactory(this.selectedFactory);
    // this.dBoardProvider.getUsersDataForFactory(this.selectedFactory);
    this.factorySelected = true;
    this.users = this.dBoardProvider.personnel;
    this.getStoredValues();
  }

  backClicked() {
    this.factorySelected = false;
    this.selectedFactory="";
  }
  passwordClick() {
    this.error = ""
  }

}
