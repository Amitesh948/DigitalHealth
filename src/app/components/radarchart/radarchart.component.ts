import { Component, effect, OnInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { color } from 'echarts';

@Component({
  selector: 'app-radarchart',
  standalone: false,
  templateUrl: './radarchart.component.html',
  styleUrls: ['./radarchart.component.css']
})
export class RadarchartComponent {
  data: any;
  keys: any;
  value: any;
  initialEntry: boolean = false;
  constructor(private common: CommonService) {
   
  }

 

  radarChartOptions = {
    tooltip: {

    },
    legend: false,
    radar: {
      splitNumber: 10,
      indicator: [
        { name: 'Sales' },
        { name: 'Administration' },
        { name: 'Information Technology' },
        { name: 'Customer Support' },
        { name: 'Development' },
      ]
    },
    series: [
      {
        name: 'Budget vs spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 20000, 35000, 50000],
            name: 'Allocated Budget',
            areaStyle: {
              color: 'rgba(171, 142, 176, 0.3)'
            },
            lineStyle: {
              color: '#ab8eb0'
            }
          },
          {
            value: [5000, 14000, 28000, 26000, 42000],
            name: 'Actual Spending',
            areaStyle: {
              color: 'rgba(76, 175, 80, 0.3)'
            },
            lineStyle: {
              color: '#68c591'
            }
          }
        ]
      }
    ]
  };


}
