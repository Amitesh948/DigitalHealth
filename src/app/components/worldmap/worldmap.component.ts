import { Component } from '@angular/core';
import * as echarts from 'echarts';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-worldmap',
  standalone: false,
  templateUrl: './worldmap.component.html',
  styleUrl: './worldmap.component.css'
})
export class WorldmapComponent {
  private apiUrl = 'http://103.127.29.85:4000/ndhs-master/country-list';

  constructor(private common: CommonService) {

  }
  ngOnInit() {
    this.common.getData(this.apiUrl,'').subscribe((data)=>{
       console.log('data',data);
       
    })
    this.initMap();
  }

  initMap() {
    const chartDom = document.getElementById('world-map')!;
    const myChart = echarts.init(chartDom);

    const option = {
      tooltip: {
        trigger: 'item',
      },
      visualMap: {
        show: false,
        min: 0,
        max: 100,
        inRange: {
          color: ['#e0ffff', '#006edd'],
        },
      },
      geo: {
        map: 'world',
        roam: true,
        itemStyle: {
          areaColor: '#f3f3f3',
          borderColor: '#111',
        },
      },
      series: [
        {
          name: '2021',
          type: 'scatter',
          coordinateSystem: 'geo',
          symbolSize: 10,
          itemStyle: {
            color: '#4169E1',
          },
          data: [
            { name: 'New York', value: [-74.006, 40.7128] },
            { name: 'London', value: [-0.1276, 51.5074] },
            { name: 'Tokyo', value: [139.6917, 35.6895] },
            // Add more data points
          ],
        },
      ],
    };

    //myChart.setOption();
  }
}
