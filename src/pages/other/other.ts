import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DashboardDataProvider } from './../../providers/dashboard-data/dashboard-data';
@Component({
  selector: 'page-otherdata',
  templateUrl: 'other.html'
})
export class OtherDataPage {
doctorRatio: number;
numOfPackageToFix: number;
numOfDoctorReels: number;
stdPacksSentToWarehouse: number;
wipPriCoat: number;
wipCoatSli: number;
  constructor(public navCtrl: NavController, private dBoardProvider: DashboardDataProvider) {

  }

}
