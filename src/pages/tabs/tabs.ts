import { UserInfoPage } from './../user-info/user-info';
import { OtherDataPage } from './../other/other';
import { Component } from '@angular/core';
import { WastePage } from '../waste/waste';
import { MaintenancePage } from '../maintenance/maintenance';
import { FIPage } from '../fi/fi';
import { DashboardDataProvider } from './../../providers/dashboard-data/dashboard-data';
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FIPage;
  tab2Root = WastePage;
  tab3Root = MaintenancePage;
  tab4Root = OtherDataPage;
  tab5Root = UserInfoPage
  constructor(private dBoardProvider: DashboardDataProvider) {
  
    console.log(this.dBoardProvider);
  }
}
