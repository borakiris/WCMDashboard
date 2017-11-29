import { OtherDataPage } from './../other/other';
import { Component } from '@angular/core';
import { WastePage } from '../waste/waste';
import { MaintenancePage } from '../maintenance/maintenance';
import { FIPage } from '../fi/fi';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = FIPage;
  tab2Root = WastePage;
  tab3Root = MaintenancePage;
  tab4Root = OtherDataPage;
  constructor() {

  }
}
