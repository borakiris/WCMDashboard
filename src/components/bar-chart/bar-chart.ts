
import { Component, OnInit, Input } from '@angular/core';
import {  ElementRef,  ViewChild } from '@angular/core';


@Component({
  selector: 'bar-chart',
  templateUrl: './bar-chart.html'
})
export class BarChartComponent implements OnInit {
  @ViewChild('mycanvas')
  canvas: ElementRef;
  private options;
  @Input() barChartObj: any;
  @Input() showMiddleVal: boolean = false;

  constructor() {

  }

  // events
  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  ngOnInit() {
  

    this.options = {
            legend: {
        display: false
      },
      title: {
        display: true,
        text: this.barChartObj.titleStr
      },
      tooltips: {
        display: true,
      },
      animation: {
        onComplete: function () {
          // me.doit(ctx);
        }
      }
      // scales: {
      //   xAxes: [{ 
      //     stacked: false, 
      //     gridLines: { display: false },
      //     }],
      //   yAxes: [{ 
      //     stacked: true
      //     }],
      // }, //
    }

  }


  isEmptyObject(obj) {
    return (obj && (Object.keys(obj).length === 0));
  }
}


