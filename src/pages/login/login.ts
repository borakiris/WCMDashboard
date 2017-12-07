import { FactoriesDataProvider } from './../../providers/factories-data/factories-data';
import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MyApp } from '../../app/app.component';
import { DashboardDataProvider } from './../../providers/dashboard-data/dashboard-data';
import { IEmployee } from '../../classes/IEmployee';
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
  password: string;
  error: string;
  constructor(private nav: NavController, public navParams: NavParams, private factoryProvider: FactoriesDataProvider,
    private dBoardProvider: DashboardDataProvider, private nativeStorage: NativeStorage, private platform: Platform) {
  }

  ngOnInit() {
    let storedFactory;
     this.platform.ready().then(
      ()=> this.nativeStorage.getItem("factory").then(
      data => {storedFactory = data;
      console.log("Stored Factory:" + storedFactory)},
      error => storedFactory = null
    ).then(
     ()=> {console.log(storedFactory);
      if (storedFactory == null) {
        this.factoryProvider.factoriesObsv.subscribe(() => {
          this.factories = this.factoryProvider.factories;
          console.log(this.factories);
          () => this.isLoading = false;
        });
      } else {
        this.dBoardProvider.getDashboardDataForFactory(storedFactory);
        this.dBoardProvider.dashboardDataBS.subscribe(dData =>  {
          this.nav.push(TabsPage)});
       
       
      }
    }
    ));
   
  }
  ionViewDidLoad() {

  }
  login() {
    if (this.password == this.userPassword) {
      this.nativeStorage.setItem("factory", this.selectedFactory).then(
      ()=> console.log('Stored item!'),
    error => console.log(error));
      this.nav.push(TabsPage);
    } else {
      this.error = "Wrong Password";
      this.password = "";
    }
    // this.nav.push(TabsPage);
  }

  onFactoryChange($event) {
    this.dBoardProvider.getDashboardDataForFactory(this.selectedFactory);
    this.dBoardProvider.getUsersDataForFactory(this.selectedFactory);
    this.factorySelected = true;
    this.users = this.dBoardProvider.personnel;
  }

  backClicked() {
    this.factorySelected = false;
  }
  passwordClick() {
    this.error = ""
  }

}
