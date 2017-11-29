import { PieChartDataForEE } from './../../classes/PieChartDataForEE';
import { Component, OnInit, Input } from '@angular/core';
import { DashboardDataProvider } from './../../providers/dashboard-data/dashboard-data';
import {  ElementRef,  ViewChild } from '@angular/core';

@Component({
  selector: 'pie-chart',
  templateUrl: './pie-chart.html'
})
export class PieChartComponent implements OnInit {
  @ViewChild('mycanvas')
  canvas: ElementRef;
  private options;
  @Input() pieChartObj: PieChartDataForEE;
  @Input() showMiddleVal: boolean = false;

  constructor(private dBoardProvider: DashboardDataProvider) {

  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {
    var ctx = this.canvas.nativeElement.getContext("2d");

    let me = this;
    this.options = {
            legend: {
        display: false
      },
      title: {
        display: true,
        text: this.pieChartObj.titleStr
      },
      tooltips: {
        display: true,
      },
      animation: {
        onComplete: function () {
          me.doit(ctx);
        }
      }
    }

  }

  doit(ctx) {
    //   Chart.types.Doughnut.prototype.draw.apply(this, arguments);
if (!this.isEmptyObject(this.pieChartObj)) {
    var width = this.canvas.nativeElement.clientWidth,
      height = this.canvas.nativeElement.clientHeight;

    var fontSize = (height / 200).toFixed(2);
    // ctx.font = fontSize + "em Verdana";
    ctx.font = "700 " + fontSize + "em Arial";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "black";
    var text = "%" + this.dBoardProvider.dataMapObj.get(this.pieChartObj.valueStr),
      textX = Math.round((width - ctx.measureText(text).width) / 2),
      textY = Math.round(height / 2) + 15;

    var grd = ctx.createLinearGradient(0, 0, 170, 0);
    grd.addColorStop(0, "black");
    grd.addColorStop(1, "gray");
    ctx.fillStyle = grd;

    ctx.fillText(text, textX, textY);
    ctx.restore();
}else{
  
}
  }

  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }
}


