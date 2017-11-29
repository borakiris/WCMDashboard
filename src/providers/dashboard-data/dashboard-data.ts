
import { Injectable } from '@angular/core';
import { IDasbhoardValues } from './../../classes/IDashboardValues';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import {  AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class DashboardDataProvider {
  dashboard: IDasbhoardValues[];
  firebaseDBName: string;
  dashboardObsv: Observable<IDasbhoardValues[]>;
  public dataMapObj: Map<string,number>;
  public dashboardDataBS: BehaviorSubject<boolean > = new BehaviorSubject<boolean >(null);

  constructor( private af: AngularFireDatabase) { 
    this.dataMapObj = new Map<string,number>();
    console.log('service const');
       this.getDashboardDataForFactory('Jeddah');
  }

 public getDashboardDataForFactory(factoryName: string) {
    this.firebaseDBName= 'Dashboard_' + factoryName;
    this.dashboardObsv = this.af.list(this.firebaseDBName).valueChanges();
    this.dashboardObsv.subscribe(dashData => {
         this.dashboard = dashData;
         dashData.forEach(element => {
          this.dataMapObj.set(element.Kod,element.Value);
         });
         this.dashboardDataBS.next(false);
    });
  }

}
