import { DashboardDataProvider } from './../providers/dashboard-data/dashboard-data';

export class BarChartDataForWaste {
    pieChartType: string;
    titleStr: string;
    pieChartLabels: string[] = ['Defect','Process', 'Tech.'];
    pieChartData: any[] = [];
    pieChartColor: any[];
    constructor(private dBoardProvider: DashboardDataProvider,chartType: string , dataStr: string, targetStr: string, titleStr: string  ) 
    { 
        this.pieChartType =chartType;

         this.titleStr = titleStr;

        let defectValueStr: string = dataStr + " (Defect) %";
        let processValueStr: string= dataStr + " (Process) %";
        let techValueStr: string= dataStr + " (Tech) %";


        let defectTargetStr: string = targetStr + " (Defect) %";
        let processTargetStr: string= targetStr + " (Process) %";
        let techTargetStr: string= targetStr + " (Tech) %";


        this.pieChartData = [
          {data: [this.dBoardProvider.dataMapObj.get(defectValueStr), this.dBoardProvider.dataMapObj.get(processValueStr), this.dBoardProvider.dataMapObj.get(techValueStr)], label: '%'},
          {data: [this.dBoardProvider.dataMapObj.get(defectTargetStr), this.dBoardProvider.dataMapObj.get(processTargetStr), this.dBoardProvider.dataMapObj.get(techTargetStr)], label: 'Target %'}
        ];
    
        // if (this.targetVal > this.eeVal) {
        //   currColor = "#c62828";
        // } else {
        //   currColor = "#9ccc65";
        // }
        this.pieChartColor = [
          {
            backgroundColor: ['#c2185b','#64b5f6', '#e0e0e0'],
            borderColor: "rgba(10,150,132,1)",
            borderWidth: 0
          },
          {
            backgroundColor: ['#9e9e9e','#9e9e9e', '#9e9e9e'],
            borderColor: "rgba(10,150,132,1)",
            borderWidth: 0
          }
        ]

     };
}