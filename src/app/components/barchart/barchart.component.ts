import { Component, ElementRef, QueryList, ViewChildren, AfterViewInit } from '@angular/core';
import { CommonService } from '../../../services/common.service';


@Component({
  selector: 'app-barchart',
  standalone: false,
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements AfterViewInit {
  @ViewChildren('chartContainer') chartContainers!: QueryList<ElementRef>;

  private apiUrl = 'http://103.127.29.85:4000/ndhs-master/comparative-bar-charts';
  requestData = {
    governance_id: '1',
    countries: '228,14',
  };

  categories: string[] = [];
  charts1: any[] = [];  
  charts2: any[] = [];
  data: any;
  isDataLoaded: boolean = false;
  keysData: any[]=[];

  constructor(private common: CommonService) {}

  ngOnInit(): void {
    this.common.postData(this.apiUrl, this.requestData).subscribe((data) => {
      this.data = data;
      console.log('apiData',data)
      this.categories = Object.keys(data);
      this.isDataLoaded = true;
      this.generateCharts(data);
    });
  }

  ngAfterViewInit(): void {
    if (this.isDataLoaded) {
      this.generateCharts(this.data);
    }
  }

  generateCharts(data: any) {
    this.categories.forEach((category, index) => {
      const keys = Object.keys(data[category]);
      this.keysData=keys;
      keys.sort();

      keys.forEach((key) => {
        const chartData = this.prepareChartData(data, category, key);
        console.log(chartData.labels);
        const options = this.createChartOptions(chartData.labels, chartData.datasets);
        if(index==0)
        this.charts1.push(options); 
        if(index==1)
          this.charts2.push(options); 
      });
    });
  }

  prepareChartData(data: any, category: string, taxonomyKey: string) {
    const ultimateNameSet: Set<string> = new Set();
    const countriesNameSet: Set<string> = new Set();
    const datasets: { label: string; data: number[] }[] = [
      { label: 'Dataset 1', data: [] },
      { label: 'Dataset 2', data: [] },
    ];

    const items = data[category][taxonomyKey];
    items.forEach((item: any) => {
      countriesNameSet.add(item.countries_name);
      ultimateNameSet.add(item.ultimate_name);
     
      
    });

    const labels: string[] = Array.from(ultimateNameSet).sort();
    const names: string[] = Array.from(countriesNameSet);

    items.forEach((item: any) => {
      const countryIndex = names.indexOf(item.countries_name);
      const labelIndex = labels.indexOf(item.ultimate_name);
     

      if (countryIndex === 0) {
        datasets[0].data[labelIndex] = item.score;
      } else if (countryIndex === 1) {
        datasets[1].data[labelIndex] = item.score;
      }
    });

    return { labels, datasets };
  }

  createChartOptions(labels: string[], datasets: any[]) {
    return {
      tooltip: {},
      xAxis: {
        type: 'category',
        data: labels,
      },
      yAxis: {
        type: 'value',
        min: 0,
        max: 100,
      },
      series: datasets.map((dataset) => ({
        name: dataset.label,
        type: 'bar',
        data: dataset.data,
        itemStyle: {
          color: dataset.label === 'Dataset 1' ? '#ab8eb0' : '#68c591',
        },
      })),
    };
  }
}
