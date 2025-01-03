import { AfterViewInit, Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import * as echarts from 'echarts';


@Component({
  selector: 'app-barchart',
  standalone: false,
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements AfterViewInit {

  private apiUrl = 'http://103.127.29.85:4000/ndhs-master/comparative-bar-charts';

  requestData = {
    governance_id: '1',
    countries: '228,14',
  };
  keys: any;
  charts: any = [];
  chartData: any = [];
  Object: any = Object;
  allData: { Availability: { score1: number; ultimate_name1: string }; Readiness: { score2: number; ultimate_name: string } }[] = [];


  constructor(private common: CommonService) { }

  ngOnInit(): void {
    this.common.postData(this.apiUrl, this.requestData).subscribe((data) => {
      this.charts = Object.entries(data);
      this.chartData = Object.values(this.charts);
      
      // this.keys = Object.keys(data);
      // this.saprateData(data);
      this.initCharts();
    });
  }

  getClass(_t6: any, _t12: any) { 
    _t12 = _t6 == 0 ? _t12 : _t12 + 10   
    return 'chartdiv' + (parseFloat(_t6) + parseFloat(_t12) + 1)
  }

  ngAfterViewInit(): void {

  }

  saprateData(value: string) {
    for (let key of this.keys) {
      const sortedCategoryKeys = Object.keys(value[key]);
      sortedCategoryKeys.sort((a, b) => a.localeCompare(b));
      const data: any[] = sortedCategoryKeys.map((sortedKey: any) => value[key][sortedKey]);
      console.log('2', data);
      //this.generateData(data,key);
    }
  }

  generateData(data: any[], key: any) {
    data.forEach((category: any) => {
      category.forEach((item: any, index: number) => {

      });
    })
  }

  initCharts() {

    setTimeout(() => {
      this.Object.values(this.chartData).forEach((data:any,key:any) => {
        this.Object.values(data[1]).forEach((element:any,key1:any) => {
          const chartDom = document.getElementById("chartDiv" + key1 + 1);
          console.log(chartDom);
          if (chartDom) {
            const myChart = echarts.init(chartDom);
      
            const option: any = {
              tooltip: {
                formatter: (params: any) => {
                  return `${params.seriesName}<br>${params.name}: ${params.value[params.seriesIndex + 1]}%`;
                },
              },
              dataset: {
                source: [
                  ['product', '2015', '2016'],
                  ['Availability', Math.random() * 100, Math.random() * 100],
                  ['Readiness', Math.random() * 100, Math.random() * 100],
                ],
              },
              xAxis: { type: 'category' },
              yAxis: {
                type: 'value',
                min: 0,
                max: 100,
                interval: 20,
                axisLabel: {
                  formatter: '{value}%',
                },
                splitLine: {
                  lineStyle: {
                    type: 'dashed',
                  },
                },
              },
              series: [
                { type: 'bar', itemStyle: { color: '#ab8eb0' }, name: '2015', barWidth: '20%', },
                { type: 'bar', itemStyle: { color: '#68c591' }, name: '2016', barWidth: '20%' },
              ],
            };
      
            myChart.setOption(option);
      
          }
          
        });
        
      });
    }, 1000);

  }

}



