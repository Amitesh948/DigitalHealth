import { Component } from '@angular/core';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-health-it',
  standalone: false,
  templateUrl: './health-it.component.html',
  styleUrls: ['./health-it.component.css']
})
export class HealthItComponent {

  keys: any;
  post: any = {};
  prospectiveDevelopmentData: any[] = [];
  catagoryKey: any[] = [];
  allData: { average: number; building: { score1: number; name1: string }; development: { score2: number; name2: string } }[] = [];
  chartOptions: any[] = [];

  constructor(private common: CommonService) { }

  ngOnInit() {
    this.common.behaviourSubject.subscribe((value) => {
      this.resetData();
      const endPoint = value === 'health-it' ? '1/14/2021' : '2/14/2021';
      this.common.getData(endPoint).subscribe(data => {
        this.post = data;
        console.log("data", this.post);

        this.keys = Object.keys(this.post);
        this.prospectiveDevelopment();
      });
    });
  }

  resetData(): void {
    this.chartOptions = [];
    this.allData = [];
    this.prospectiveDevelopmentData = [];
  }

  prospectiveDevelopment() {
    const data1: any[] = Object.values(this.post);

    const data2 = data1[0];
    const unsortedCategoryKeys = Object.keys(data2);
    const sortedCategoryKeys = unsortedCategoryKeys.sort((a, b) => a.localeCompare(b));

    this.prospectiveDevelopmentData = sortedCategoryKeys.map((sortedKey) => data2[sortedKey]);
    this.calculateData();

  }

  calculateData(): void {
    this.prospectiveDevelopmentData.forEach((category: any) => {
      let totalScore = 0;
      const building = { score1: 0, name1: 'N/A' };
      const development = { score2: 0, name2: 'N/A' };

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
      this.allData.push({ average, building, development });
    });

    this.generateChartOptions();
  }

  generateChartOptions(): void {
    this.allData.forEach((data) => {
      const { average, building, development } = data;
      this.chartOptions.push(this.createPieChart(average, building, development));
    });
  }

  createPieChart(score: number, buildingData: any, developmentData: any): any {
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
            { value: buildingData.score1, name: buildingData.name1, itemStyle: { color: '#2f4770' } },
            { value: developmentData.score2, name: developmentData.name2, itemStyle: { color: '#0648bf' } },
            { value: remaining, name: '', itemStyle: { color: '#e0e0e0' } }
          ]
        }
      ]
    };
  }
}
