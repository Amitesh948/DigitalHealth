import { Component } from '@angular/core';
import { CommonService } from '../../../services/common.service';
import { color } from 'echarts';

@Component({
  selector: 'app-health-it',
  standalone: false,
  templateUrl: './health-it.component.html',
  styleUrls: ['./health-it.component.css']
})
export class HealthItComponent {
  private apiUrl = 'http://103.127.29.85:4000/ndhs-master/governance-stats';
  keys: any;
  catagoryKey: any[] = [];
  allData: { key: string; average: number; building: { score1: number; name1: string }; development: { score2: number; name2: string } }[] = [];
  chartOptions1: any[] = [];
  chartOptions2: any[] = [];

  constructor(private common: CommonService) { }

  ngOnInit() {
    this.common.behaviourSubject.subscribe((value) => {
      this.resetData();
      const endPoint = value === 'health-it' ? '1/14/2021' : '2/14/2021';
      this.common.getData(this.apiUrl,endPoint).subscribe(data => {
        this.keys = Object.keys(data);
        this.prospectiveDevelopment(data);
      });
    });
  }

  resetData(): void {
    this.chartOptions1 = [];
    this.chartOptions2 = [];
    this.allData = [];
  }

  prospectiveDevelopment(value: string) {
    for (let key of this.keys) {
      this.chartOptions1 = [];

      const unsortedCategoryKeys = Object.keys(value[key]);
      const sortedCategoryKeys = unsortedCategoryKeys.sort((a, b) => a.localeCompare(b));
      this.catagoryKey = sortedCategoryKeys;
      const data: any[] = sortedCategoryKeys.map((sortedKey: any) => value[key][sortedKey]);
      this.calculateData(data, key);
    }
  }

  calculateData(data: any[], key: any): void {
    data.forEach((category: any) => {
      let totalScore = 0;
      const building = { score1: 0, name1: '' };
      const development = { score2: 0, name2: '' };

      if (category) {
        category.forEach((item: any, index: number) => {
          const score = parseInt(item.score, 10);

          if (index === 0) {
            const halfScore1 = Math.round(score / 2);
            development.score2 = halfScore1;
            development.name2 = item.ultimate_name;
          } else if (index === 1) {
            const halfScore2 = Math.round(score / 2);
            building.score1 = halfScore2;
            building.name1 = item.ultimate_name;
          }

          totalScore += score;
        });
      }

      const average = Math.round(totalScore / 2);
      this.allData.push({ key, average, building, development });
      console.log("0000", this.allData);
    });

    this.generateChartOptions();
  }

  generateChartOptions(): void {
    console.log("gene", this.allData);
    this.allData.forEach((data) => {
      const colors = {
        building: ' #2f4770',
        development: '#0648bf', 
        remaining: '#e0e0e0'   
      };
      const { key, average, building, development } = data;
      if (key === 'Present Development')
        {
          colors.building='#176d3b';
          colors.development='#558288'
          this.chartOptions1.push(this.createPieChart(average, building, development,colors));
        }
      else
       {
        this.chartOptions2.push(this.createPieChart(average, building, development,colors));
       }
    });
  }

  createPieChart(score: number, buildingData: any, developmentData: any, colors: { building: string; development: string; remaining: string; }): any {
    const remaining = 100 - score;

    return {
      tooltip: {
        trigger: 'item',
        formatter: function (params: any) {
          return params.name !== '' ? `${params.data.name} : ${params.data.value}%` : '';
        },
      },
      series: [
        {
          type: 'pie',
          radius: ['30%', '50%'],
          label: {
            show: true,
            position: 'center',
            formatter: `${score}%`,
            fontSize: 30,
            fontWeight: 'bold',
            color: '#333',
          },
          data: [
            { value: buildingData.score1, name: buildingData.name1, itemStyle: { color: colors.building } },
            { value: developmentData.score2, name: developmentData.name2, itemStyle: { color: colors.development } },
            { value: remaining, name: '', itemStyle: { color: colors.remaining } }
          ]
        }
      ]
    };
  }
}
