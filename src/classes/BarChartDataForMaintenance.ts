import { DashboardDataProvider } from './../providers/dashboard-data/dashboard-data';

export class BarChartDataForMaintenance {
    pieChartType: string;
    titleStr: string;
    pieChartLabels: string[] = ['Factory','Printer', 'Laminator','Slitter'];
    pieChartData: any[] = [];
    pieChartColor: any[];
    constructor(private dBoardProvider: DashboardDataProvider,chartType: string , stopStr: string, titleStr: string  ) 
    { 
        this.pieChartType =chartType;

         this.titleStr = titleStr;

        let factoryValue: string =  "Factory MTBF " + stopStr +" (" + titleStr +") hr.";
        let printingValueStr: string= "Printer MTBF " + stopStr +" (" + titleStr +") hr.";
        let laminatingValueStr: string= "Laminator MTBF " + stopStr +" (" + titleStr +") hr.";
        let slittingValueStr: string= "Slitter MTBF " + stopStr +" (" + titleStr +") hr.";

        let factoryTargetStr: string = "Factory MTBF " + stopStr +" Target hr.";
        let printingTargetStr: string= "Printer MTBF " + stopStr +" Target hr.";
        let laminatingTargetStr: string= "Laminator MTBF " + stopStr +" Target hr.";
        let slittingTargetStr: string= "Slitter MTBF " + stopStr +" Target hr.";

        this.pieChartData = [
          {data: [this.dBoardProvider.dataMapObj.get(factoryValue), this.dBoardProvider.dataMapObj.get(printingValueStr), this.dBoardProvider.dataMapObj.get(laminatingValueStr), this.dBoardProvider.dataMapObj.get(slittingValueStr)], label: 'MTBF' + stopStr +' hr.'},
          {data: [this.dBoardProvider.dataMapObj.get(factoryTargetStr), this.dBoardProvider.dataMapObj.get(printingTargetStr), this.dBoardProvider.dataMapObj.get(laminatingTargetStr), this.dBoardProvider.dataMapObj.get(slittingTargetStr)], label: 'Target hr.'}
        ];
    
        // if (this.targetVal > this.eeVal) {
        //   currColor = "#c62828";
        // } else {
        //   currColor = "#9ccc65";
        // }
        this.pieChartColor = [
          {
             backgroundColor: ['#ffb74d','#64b5f6', '#5c6bc0','#64b5f6'],
            borderColor: "rgba(10,150,132,1)",
            borderWidth: 0
          },
          {
            backgroundColor: ['#9e9e9e','#9e9e9e', '#9e9e9e', '#9e9e9e'],
            borderColor: "rgba(10,150,132,1)",
            borderWidth: 0
          }
        ]

     };
}