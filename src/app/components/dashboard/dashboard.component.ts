import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'] // Fixed typo
})
export class DashboardComponent implements OnInit {
  @ViewChild('chart', { static: true }) chartContainer!: ElementRef; // Reference to the chart container

  ngOnInit(): void {
    const chartDom = this.chartContainer.nativeElement; // Access the chart container
    const myChart = echarts.init(chartDom); // Initialize the chart

    const chartOptions = {
      title: {
        text: 'Pie Chart Example',
        left: 'center'
      },
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        left: 'left'
      },
      series: [
        {
          name: 'Access Source',
          type: 'pie',
          radius: '50%',
          data: [
            { value: 1048, name: 'Search Engine' },
            { value: 735, name: 'Direct' },
            { value: 580, name: 'Email' },
            { value: 484, name: 'Affiliate Ads' },
            { value: 300, name: 'Video Ads' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          },
        }
      ]
    };

    myChart.setOption(chartOptions); // Set the chart options
  }

  
}
