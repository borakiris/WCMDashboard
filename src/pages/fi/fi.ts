import { PieChartDataForEE } from './../../classes/PieChartDataForEE';
import { DashboardDataProvider } from './../../providers/dashboard-data/dashboard-data';
import { IDasbhoardValues } from './../../classes/IDashboardValues';
import { IEmployee } from './../../classes/IEmployee';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { NavController } from 'ionic-angular';

import 'rxjs/add/operator/map';
import { Content } from 'ionic-angular';
@Component({
  selector: 'page-fi',
  templateUrl: 'fi.html'
})
export class FIPage implements OnInit {
  @ViewChild(Content) content: Content;
  employees: IEmployee[];
  dashboard: IDasbhoardValues[];
  dashboardLoaderStatus: boolean = false;
  priYesterdayEE: PieChartDataForEE;
  priMTDEE: PieChartDataForEE;
  lamYesterdayEE: PieChartDataForEE;
  lamMTDEE: PieChartDataForEE;
  sliYesterdayEE: PieChartDataForEE;
  sliMTDEE: PieChartDataForEE;
  constructor(public navCtrl: NavController, private dBoardProvider: DashboardDataProvider) { }
  ngOnInit() {
    // this.dashboardLoaderStatus = true;
    // this.dBoardProvider.dashboardDataBS.subscribe((retData: boolean) => {
    //   this.dashboardLoaderStatus = retData;
      this.dashboard = this.dBoardProvider.dashboard;
      this.priYesterdayEE = new PieChartDataForEE(this.dBoardProvider,'doughnut','Printer(Yesterday\'s EE)','Printer(Target EE)','Yesterday\'s EE');
      this.priMTDEE = new PieChartDataForEE(this.dBoardProvider,'doughnut','Printer(MTD EE)','Printer(Target EE)','MTD EE');
      this.lamYesterdayEE = new PieChartDataForEE(this.dBoardProvider,'doughnut','Laminator(Yesterday\'s EE)','Laminator(Target EE)','Yesterday\'s EE');
      this.lamMTDEE = new PieChartDataForEE(this.dBoardProvider,'doughnut','Laminator(MTD EE)','Laminator(Target EE)','MTD EE');
      this.sliYesterdayEE = new PieChartDataForEE(this.dBoardProvider,'doughnut','Slitter(Yesterday\'s EE)','Slitter(Target EE)','Yesterday\'s EE');
      this.sliMTDEE = new PieChartDataForEE(this.dBoardProvider,'doughnut','Slitter(MTD EE)','Slitter(Target EE)','MTD EE');

    // });
  }
  getTextAndValue(keyVal:string):string{
    return keyVal + ": " + this.dBoardProvider.dataMapObj.get(keyVal);
  }
  getValue(keyVal:string):number{
    return this.dBoardProvider.dataMapObj.get(keyVal);
  }
}
