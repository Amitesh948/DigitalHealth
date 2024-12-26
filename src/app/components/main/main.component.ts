import * as echarts from 'echarts';
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-main',
  standalone: false,
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {
  // post: any[] = [];
  // averages: number[] = [];
  // chartOptions1: any;
  // chartOptions2: any;
  // chartOptions3: any;
  // chartOptions4: any;
  // chartOptions5: any;

  // constructor(private common: CommonService) { }

  // ngOnInit() {
  //   this.common.getData().subscribe(data => {
  //     this.post = data;
  //     console.log("data", this.post);
  //     this.calculateAverages(this.post);
  //     console.log("Category Averages:", this.averages);

  //   });
  // }

  // calculateAverages(data: any): void {
  //   const categories = [
  //     "AI Workforce/Infrastructure",
  //     "Healthcare Governance",
  //     "Healthcare workforce and Infrastructure",
  //     "IT Governance",
  //     "IT Workforce & Infrastructure",
  //   ];

  //   const prospectiveData = data["Prospective Development"];
  //   categories.forEach(category => {
  //     let sum = 0;
  //     if (prospectiveData[category]) {
  //       sum = prospectiveData[category].reduce((acc: number, item: { score: string; }) => acc + parseInt(item.score, 10), 0);
  //     }
  //     const average = sum / 2;  // Dividing by 2 as per your original logic
  //     this.averages.push(Math.round(average));
  //   });
  // }

  chartOptions = {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: {c} ({d}%)'
    },
    visualMap: {
      show: false,
      min: 0,
      max: 100,
      inRange: {
        colorLightness: [0.2, 0.8]
      }
    },
    series: [
      {
        name: '3D Pie Chart',
        type: 'pie',
        radius: ['40%', '70%'], // Inner and outer radius for doughnut shape
        roseType: 'radius', // Adds a "3D-like" effect
        avoidLabelOverlap: true,
        label: {
          show: true,
          formatter: '{b}: {d}%'
        },
        labelLine: {
          lineStyle: {
            color: '#ccc'
          },
          smooth: 0.2,
          length: 10,
          length2: 20
        },
        itemStyle: {
          color: (params: any) => params.color,
          shadowBlur: 200,
          shadowColor: 'rgba(0, 0, 0, 0.5)'
        },
        emphasis: {
          itemStyle: {
            shadowBlur: 200,
            shadowColor: 'rgba(0, 0, 0, 0.5)'
          }
        },
        data: [
          { value: 90, name: 'Availability', itemStyle: { color: '#00c49f' } },
          { value: 5, name: 'Readiness', itemStyle: { color: '#0088ff' } },
          { value: 5, name: 'Remaining', itemStyle: { color: '#e0e0e0' } }
        ]
      }
    ]
  };
}
