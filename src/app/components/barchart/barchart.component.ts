import { Component, ElementRef, QueryList, ViewChildren, AfterViewInit, effect, signal } from '@angular/core';
import { CommonService } from '../../../services/common.service';


@Component({
  selector: 'app-barchart',
  standalone: false,
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent implements AfterViewInit {
  @ViewChildren('chartContainer') chartContainers!: QueryList<ElementRef>;

  categories: string[] = [];
  charts1: any[] = [];
  charts2: any[] = [];
  data: any;
  isDataLoaded: boolean = false;
  keysData: any[] = [];

  private apiUrl = 'http://103.127.29.85:4000/ndhs-master/comparative-bar-charts';
  requestData = {
    governance_id: '1',
    countries: `228,14`,
  };

  constructor(private common: CommonService) {
    effect(() => {
      common.presentValueSignal.set([])
      common.prospectiveValueSignal.set([])
      this.fetchDataFromApi();
    });
  }

  ngOnInit(): void {

  }
  fetchDataFromApi() {
    const toggleChange = this.common.changeToggleButton();
    if (toggleChange === 'health-it') {
      this.requestData.governance_id = '1';
    }
    else {
      this.requestData.governance_id = '2'
    }

    this.common.postData(this.apiUrl, this.requestData).subscribe((data) => {
      this.data = data;
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
  resetData() {
    this.charts1 = [];
    this.charts2 = [];
  }

  generateCharts(data: any) {
    this.resetData();
    this.categories.forEach((category, index) => {
      this.keysData = Object.keys(data[category]).sort();


      this.keysData.forEach((key) => {
        const chartData = this.prepareChartData(data, category, key);
        const options = this.createChartOptions(chartData.labels, chartData.datasets);
        if (index == 0)
          this.charts1.push(options);
        if (index == 1)
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
    let aveOfCountry1 = 0;
    let aveOfCountry2 = 0;

    items.forEach((item: any) => {
      const countryIndex = names.indexOf(item.countries_name);
      const labelIndex = labels.indexOf(item.ultimate_name);
      const score = parseInt(item.score, 10);
      if (countryIndex === 0) {
        aveOfCountry1 += score;
        datasets[0].data[labelIndex] = item.score;
      } else if (countryIndex === 1) {
        aveOfCountry2 += score;
        datasets[1].data[labelIndex] = item.score;
      }
    });
    if (this.categories[0] === category) {
      this.common.presentValueSignal.update((pairs) => [
        ...pairs,
        {key : category ,taxonomyKey: taxonomyKey,countryName:{firstCountry:names[0] , secondCountry: names[1]} , countryData: { firstCountry: Math.round(aveOfCountry1 / 2), secondCountry: Math.round(aveOfCountry2 / 2) } }
      ]);
    }
    if (this.categories[1] === category) {
      this.common.prospectiveValueSignal.update((pairs) => [
        ...pairs,
        {key : category ,taxonomyKey: taxonomyKey, countryName:{firstCountry:names[0] , secondCountry: names[1]} ,countryData: { firstCountry: Math.round(aveOfCountry1 / 2), secondCountry: Math.round(aveOfCountry2 / 2) } }
      ]);
    }
    return { labels, datasets };
  }

  createChartOptions(labels: string[], datasets: any[]) {

    return {
      tooltip: {},
      xAxis: {
        type: 'category',
        data: labels,
        axisLabel: {
          interval: 0,
          formatter: (value: string) => {
            const index = value.indexOf(' ');
            if (index !== -1) {
              return value.slice(0, index) + '\n' + value.slice(index + 1);
            }
            return value;
          },
        },
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
