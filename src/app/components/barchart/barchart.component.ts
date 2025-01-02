import { Component } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-barchart',
  standalone: false,
  templateUrl: './barchart.component.html',
  styleUrls: ['./barchart.component.css']
})
export class BarchartComponent {
  private apiUrl = 'http://103.127.29.85:4000/ndhs-master/comparative-bar-charts';
  requestData = {
    governance_id: '1',
    countries: '228,14',
  };

  public chartsData: any[] = []; // Array to store chart configurations
  public chartInstances: any[] = []; // Array to store chart instances

  constructor(private common: CommonService) { }

  ngOnInit(): void {
    this.common.postData(this.apiUrl, this.requestData).subscribe((data) => {
      const keys = Object.keys(data);
      const values = Object.values(data);
      console.log("API data:", data);

      // Process the data to generate chart configurations
      this.extractData(keys, values);
    });
  }

  extractData(keys: any[], values: any[]): void {
    values.forEach((value: any, index: number) => {
      const categoryKey = keys[index];
      const categoryValues = Object.values(value);

      // Prepare chart data
      const labels = Object.keys(value);
      const data = categoryValues;

      this.chartsData.push({
        id: `Chart${index + 1}`,
        labels: labels,
        datasets: [
          {
            label: categoryKey,
            data: data,
            backgroundColor: this.getRandomColors(data.length),
          },
        ],
      });
    });

    this.createCharts();
  }

  createCharts(): void {
    this.chartsData.forEach((chartData) => {
      const canvasElement = document.getElementById(chartData.id) as HTMLCanvasElement;
    console.log("111111");
    
      if (canvasElement) {
        const chart = new Chart(canvasElement, {
          type: 'bar',
          data: {
            labels: chartData.labels,
            datasets: chartData.datasets,
          },
          options: {
            aspectRatio: 2.5,
            plugins: {
              legend: {
                display: true,
              },
            },
          },
        });

        this.chartInstances.push(chart);
      }
    });
  }

  getRandomColors(count: number): string[] {
    const colors = [];
    for (let i = 0; i < count; i++) {
      colors.push(`#${Math.floor(Math.random() * 16777215).toString(16)}`);
    }
    return colors;
  }
}
