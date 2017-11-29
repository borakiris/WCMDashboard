import { BarChartDataForMaintenance } from './../../classes/BarChartDataForMaintenance';
import { DashboardDataProvider } from './../../providers/dashboard-data/dashboard-data';
import { IDasbhoardValues } from './../../classes/IDashboardValues';
import { IEmployee } from './../../classes/IEmployee';
import { Component, OnInit, ViewChild  } from '@angular/core';
import { NavController } from 'ionic-angular';

import 'rxjs/add/operator/map';
import { Content } from 'ionic-angular';
@Component({
  selector: 'page-maintenance',
  templateUrl: 'maintenance.html'
})
export class MaintenancePage implements OnInit {
  @ViewChild(Content) content: Content;
  employees: IEmployee[];
  dashboard: IDasbhoardValues[];
  dashboardLoaderStatus: boolean = false;
  mtbf21Daily: BarChartDataForMaintenance;
  mtbf21MTD: BarChartDataForMaintenance;
  mtbf2126Daily: BarChartDataForMaintenance;
  mtbf2126MTD: BarChartDataForMaintenance;

  constructor(public navCtrl: NavController, private dBoardProvider: DashboardDataProvider) { }
  ngOnInit() {
    this.dashboardLoaderStatus = true;
    this.dBoardProvider.dashboardDataBS.subscribe((retData: boolean) => {
      this.dashboardLoaderStatus = retData;
      this.dashboard = this.dBoardProvider.dashboard;
      this.mtbf21Daily = new BarChartDataForMaintenance(this.dBoardProvider,'bar','21','Yesterday\'s');
       this.mtbf21MTD = new BarChartDataForMaintenance(this.dBoardProvider,'bar','21','MTD');
       this.mtbf2126Daily = new BarChartDataForMaintenance(this.dBoardProvider,'bar','21&26','Yesterday\'s');
       this.mtbf2126MTD = new BarChartDataForMaintenance(this.dBoardProvider,'bar','21&26','MTD');
    });
  }
  getTextAndValue(keyVal:string):string{
    return keyVal + ": " + this.dBoardProvider.dataMapObj.get(keyVal);
  }
  getValue(keyVal:string):number{
    return this.dBoardProvider.dataMapObj.get(keyVal);
  }
}


