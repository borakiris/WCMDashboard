import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DashboardDataProvider } from './../../providers/dashboard-data/dashboard-data';
@Component({
  selector: 'page-otherdata',
  templateUrl: 'other.html'
})
export class OtherDataPage {
doctorRatio: number;
doctorRatioTarget: number;
numOfPackageToFix: number;
numOfDoctorReels: number;
doctorStock: number;
wipPriCoat: number;
wipCoatSli: number;
doctorStockTarget: number;
wipPriCoatTarget: number;
wipCoatSliTarget: number;
  constructor(public navCtrl: NavController, private dBoardProvider: DashboardDataProvider) {
    this.doctorRatio=this.dBoardProvider.dataMapObj.get("DOCTOR RATIO Yesterday's");
    this.doctorRatioTarget=this.dBoardProvider.dataMapObj.get("DOCTOR RATIO Target");
    this.numOfPackageToFix=this.dBoardProvider.dataMapObj.get("NUMBER OF PACKAGES TO FIX");
    this.numOfDoctorReels=this.dBoardProvider.dataMapObj.get("NUMBER OF DOCTOR REELS");
    this.doctorStock=this.dBoardProvider.dataMapObj.get("DOCTOR STOCK");
    this.doctorStockTarget=this.dBoardProvider.dataMapObj.get("DOCTOR STOCK (Target)");
    this.wipPriCoat=this.dBoardProvider.dataMapObj.get("WIP PRINTING-COATING");
    this.wipPriCoatTarget=this.dBoardProvider.dataMapObj.get("WIP PRINTING-COATING (Target)");
    this.wipCoatSli=this.dBoardProvider.dataMapObj.get("WIP COATING-SLITTING");
    this.wipCoatSliTarget=this.dBoardProvider.dataMapObj.get("WIP COATING-SLITTING (Target) ");
  }

}
