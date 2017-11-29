import { NgModule } from '@angular/core';
import { PieChartComponent } from './pie-chart/pie-chart';
import { BarChartComponent } from './bar-chart/bar-chart';
import { ChartsModule } from 'ng2-charts/ng2-charts';

@NgModule({
	declarations: [PieChartComponent,BarChartComponent],
	imports: [ChartsModule],
	exports: [PieChartComponent,BarChartComponent],
	providers: []
})
export class ComponentsModule {}
