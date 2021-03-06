import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import Chart from 'chart.js';
import Chartist from 'chartist';
import * as FillDonut from 'chartist-plugin-fill-donut';
import { drawVeloc } from './utils';

var fillDonut = FillDonut;

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent implements OnInit {
  name = 'Angular';
  @ViewChild('canvas') canvasEl: ElementRef;
  canvas: any;
  chart: Chart;
  ctx: any;  
  data1 = [1, 2, 2, 7, 7, 8, 10];
  data2 = [1, 1, 2, 1, 1, 2, 1 ];
  data3 = [1, 3, 4 , 5, 2, 1, 1 ];
  velocPlot;
  velocFillPlot;
  ngOnInit() {
    this.plot();
    this.plotVeloc();
    this.plotFillVeloc();
  }

  plot() {
    this.canvas = this.canvasEl.nativeElement;
		this.ctx = this.canvasEl.nativeElement.getContext('2d');

		this.chart = new Chart(this.ctx, <any>{
			type: 'line',
			data: {
        labels: [0, 0, 0, 0, 0, 0, 0],
				datasets: [
					{ 
						data: this.data1,
						label: 'Maximum',
						borderColor:'rgb(148, 0, 0)',
						backgroundColor:'rgba(148, 0, 0, 0.5)',
						borderWidth: 2.5,
						fill: false,
						pointRadius: 0,
						pointHoverRadius: 6,
						pointHitRadius: 5,
						pointHoverBorderWidth: 1.5,
					},
					{ 
						data: this.data2,
						label: 'Minimum',
						borderColor: 'rgb(23, 197, 235)',
						backgroundColor: 'rgba(23, 197, 235, 0.5)',
						borderWidth: 2.5,
						fill: false,
						pointRadius: 0,
						pointHoverRadius: 6,
						pointHitRadius: 5,
						pointHoverBorderWidth: 1.5,
					},
					{ 
						data: this.data3,
						label: 'Average',
						borderColor: 'rgb(247, 1, 250)',
						backgroundColor: 'rgba(247, 1, 250, 0.5)',
						borderWidth: 2.5,
						fill: false,
						pointRadius: 0,
						pointHitRadius: 5,
						pointHoverRadius: 6,
						pointHoverBorderWidth: 1.5
					}
				]
			},
			options: {
				animation: false,
				responsive: true,
				maintainAspectRatio: false,
			}
	  });
	}

  plotVeloc () {
    this.velocPlot = new Chartist.Pie('.bi-veloc', {
      series: [20, 10, 30, 40]
    }, {
      donut: true,
      donutWidth: 60,
      startAngle: 270,
      total: 200,
      showLabel: true
    });
  }

  plotFillVeloc() {    
    this.velocFillPlot = new Chartist.Pie('#bi-fill-veloc', 
    {
        series: [160, 60 ],
        labels: ['160', '60']
    }, {
        donut: true,
        donutWidth: 30,
        startAngle: 210,
        total: 260,
        showLabel: true,
        plugins: [
            Chartist.plugins.fillDonut({
                items: [{
                    content: '<i class="fa fa-tachometer"></i>',
                    position: 'bottom',
                    offsetY : 10,
                    offsetX: -2
                }, {
                    content: '<h3>160<span class="small">mph</span></h3>'
                }]
            })
        ],
    });

    this.velocFillPlot.on('draw', drawVeloc);
  }
}

