import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { AngularFireDatabase } from 'angularfire2/database';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/take'
@Injectable()
export class FactoriesDataProvider {
  factories: string[];
  firebaseDBName: string;
  factoriesObsv: Observable<any[]>;


  public isFactoryLoading: boolean = true;
  public dataMapObj: Map<string, number>;
  public dashboardDataBS: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);

  constructor(private af: AngularFireDatabase) {
    this.dataMapObj = new Map<string, number>();

    //this.getFactories();
  }

  public getFactories() {
    this.factoriesObsv = this.af.list('Dashboard_Factories').valueChanges();
    this.factoriesObsv.subscribe(factData => {
      this.factories = factData;
      this.isFactoryLoading = false;
    });
  }
  public getFactoriesObsv() {
    return this.af.list('Dashboard_Factories').valueChanges();
  }
}
