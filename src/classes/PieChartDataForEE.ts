import { DashboardDataProvider } from './../providers/dashboard-data/dashboard-data';

export class PieChartDataForEE {
    pieChartType: string;
    valueStr: string;
    targetStr: string;
    titleStr: string;
    pieChartLabels: string[] = ['EE','GAP', 'Stops'];
    pieChartData: any[] = [];
    targetVal: number;
    eeVal: number;
    pieChartColor: any[];
    constructor(private dBoardProvider: DashboardDataProvider,pieChartType: string, valueStr: string, targetStr: string,titleStr: string ) 
    { 
        this.pieChartType = pieChartType;
        this.valueStr = valueStr;
        this.targetStr = targetStr;
        this.titleStr = titleStr;

        let currColor: string;
        this.targetVal = this.dBoardProvider.dataMapObj.get(this.targetStr);
    
        this.eeVal = this.dBoardProvider.dataMapObj.get(this.valueStr);
        let stopVal: number = 100 - this.eeVal;
        let targetDiff: number = this.targetVal - this.eeVal;
        if (targetDiff<0){
          targetDiff=0;
        }
        this.pieChartData = [this.eeVal,targetDiff.toFixed(2), stopVal.toFixed(2)];
    
        if (this.targetVal > this.eeVal) {
          currColor = "#c62828";
        } else {
          currColor = "#9ccc65";
        }
        this.pieChartColor = [
          {
            backgroundColor: [currColor,'#fff59d', '#f5f5f5'],
            borderColor: "rgba(10,150,132,1)",
            borderWidth: 0
          }
        ]

     };
}