import { BarChartDataForWaste } from './../../classes/BarChartDataForWaste';
import { DashboardDataProvider } from './../../providers/dashboard-data/dashboard-data';
import { IDasbhoardValues } from './../../classes/IDashboardValues';
import { IEmployee } from './../../classes/IEmployee';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { NavController } from 'ionic-angular';

import 'rxjs/add/operator/map';
import { Content } from 'ionic-angular';
@Component({
  selector: 'page-waste',
  templateUrl: 'waste.html'
})
export class WastePage implements OnInit {
  @ViewChild(Content) content: Content;
  employees: IEmployee[];
  dashboard: IDasbhoardValues[];
  dashboardLoaderStatus: boolean = false;
  meterWasteDaily: BarChartDataForWaste;
  meterWasteMTD: BarChartDataForWaste;
  kgWasteDaily: BarChartDataForWaste;
  kgWasteMTD: BarChartDataForWaste;

  constructor(public navCtrl: NavController, private dBoardProvider: DashboardDataProvider) { }
  ngOnInit() {
    this.dashboardLoaderStatus = true;
    this.dBoardProvider.dashboardDataBS.subscribe((retData: boolean) => {
      this.dashboardLoaderStatus = retData;
      this.dashboard = this.dBoardProvider.dashboard;
      this.meterWasteDaily = new BarChartDataForWaste(this.dBoardProvider,'bar','Consumed Meter Yesterday\'s','Consumed Meter Target','Yesterday\'s');
       this.meterWasteMTD = new BarChartDataForWaste(this.dBoardProvider,'bar','Consumed Meter MTD','Consumed Meter Target','MTD');
       this.kgWasteDaily = new BarChartDataForWaste(this.dBoardProvider,'bar','Consumed Kg Yesterday\'s','Consumed Kg Target','Yesterday\'s');
       this.kgWasteMTD = new BarChartDataForWaste(this.dBoardProvider,'bar','Consumed Kg MTD','Consumed Kg Target','MTD');
    });
  }
  getTextAndValue(keyVal:string):string{
    return keyVal + ": " + this.dBoardProvider.dataMapObj.get(keyVal);
  }
  getValue(keyVal:string):number{
    return this.dBoardProvider.dataMapObj.get(keyVal);
  }
}

