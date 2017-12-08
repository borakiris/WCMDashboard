import { IEmployee } from './../../classes/IEmployee';

import { Injectable } from '@angular/core';
import { IDasbhoardValues } from './../../classes/IDashboardValues';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import * as moment from 'moment-msdate';
import { DateTime } from 'ionic-angular/components/datetime/datetime';

@Injectable()
export class DashboardDataProvider {
  dashboard: IDasbhoardValues[];
  factories: string[];
  personnel: IEmployee[];
  firebaseDBName: string;
  dashboardObsv: Observable<any[]>;
  personnelObsv: Observable<IEmployee[]>;

  public isUserLoading: boolean = true;
  public isDashboardLoading: boolean = true;
  public dataMapObj: Map<string, number>;
  public dashboardDataBS: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  public tarihStr: string;

  constructor(private af: AngularFireDatabase) {
    this.dataMapObj = new Map<string, number>();
    // this.getDashboardDataForFactory('Jeddah');
  }

  public getDashboardDataForFactory(factoryName: string) {

    this.firebaseDBName = 'Dashboard_' + factoryName;
    this.dashboardObsv = this.af.list(this.firebaseDBName).valueChanges();
    this.dashboardObsv.subscribe(dashData => {
      this.dashboard = dashData;
      console.log("Data came:" + dashData);
      // var test = dashData[1];
      // var jsonVeri: any = JSON.parse(test);
      // var listA: IDasbhoardValues[] = jsonVeri;
      dashData.forEach(element => {
        this.dataMapObj.set(element.Kod.replace('Baskı', 'Printer').replace('Kaplama', 'Laminator').replace('Kesme', 'Slitter'), element.Value);
      });
      let tarVal: number = this.dataMapObj.get("Date");
      this.tarihStr = moment.fromOADate(tarVal).format('Do MMMM YYYY')
      this.isDashboardLoading = false;
      this.dashboardDataBS.next(false);
    });
  }

  public getUsersDataForFactory(factoryName: string) {
    this.firebaseDBName = 'Users_' + factoryName;
    this.personnelObsv = this.af.list(this.firebaseDBName).valueChanges();
    this.personnelObsv.subscribe(userData => {
      this.personnel = userData;
      this.isUserLoading = false;
    });
  }

}
