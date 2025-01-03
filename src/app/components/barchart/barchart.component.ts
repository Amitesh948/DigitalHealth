import { Component, ElementRef, QueryList, ViewChildren } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-barchart',
  standalone: false,
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent {
  @ViewChildren('chartContainer') chartContainers!: QueryList<ElementRef>;

  private apiUrl = 'http://103.127.29.85:4000/ndhs-master/comparative-bar-charts';

  requestData = {
    governance_id: '1',
    countries: '228,14',
  };
  
  categories = ['Present Development', 'Prospective Development'];

  constructor(private common: CommonService) {}

  ngOnInit(): void {
    this.common.postData(this.apiUrl, this.requestData).subscribe((data) => {
      
      this.generateCharts(data);
    });
  }

  generateCharts(data: any) {
    
    this.chartContainers.forEach(container => {
      container.nativeElement.innerHTML = '';
    });

    this.categories.forEach((category, index) => {
      const taxonomyKeys = Object.keys(data[category]);
      console.log('1',taxonomyKeys);
      
      taxonomyKeys.forEach((key) => {
        const chartData = this.prepareChartData(data, category, key);
        this.createChart(this.chartContainers.toArray()[index].nativeElement, category, key, chartData.labels, chartData.datasets);
      });
    });
  }

  prepareChartData(data: any, category: string, taxonomyKey: string) {
    console.log('data',data);
    
    const labels: string[] = ['Availability', 'Readiness'];
    const datasets: { label: string; backgroundColor: string; data: number[] }[] = [
      {
        label: 'Dataset 1',
        backgroundColor: '#ab8eb0',
        data: [],
      },
      {
        label: 'Dataset 2',
        backgroundColor: ' #68c591',
        data: [],
      },
    ];

    const items = data[category][taxonomyKey];

    items.forEach((item: any, index: number) => {
      if (index % 2 === 0) {
        datasets[0].data.push(+item.score);
      } else {
        datasets[1].data.push(+item.score);
      }
    });

    return { labels, datasets };
  }

  createChart(container: HTMLElement, _category: string, _taxonomyKey: string, labels: string[], datasets: any[]) {
    const canvas = document.createElement('canvas');
    container.appendChild(canvas);

    new Chart(canvas, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: datasets,
      },
      options: {
        responsive: true,
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          x: {
            stacked: false,
            beginAtZero: true,
          },
          y: {
            beginAtZero: true,
          },
        },
      },         
    });
  }
}


