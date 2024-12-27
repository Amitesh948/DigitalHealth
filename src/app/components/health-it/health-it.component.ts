import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-health-it',
  standalone: false,
  templateUrl: './health-it.component.html',
  styleUrls: ['./health-it.component.css']
})
export class HealthItComponent implements OnChanges {
  @Input() isToggleSelected: string = 'health-it';
  keys: any;
  post: any = {};
  prospectiveDevelopmentData: any[] = [];
  catagoryKey: any[] = [];
  averages: number[] = [];
  halfOfDevelopment: { score: number; name: string }[] = [];
  halfofBuilding: { score: number; name: string }[] = [];

  chartOptions: any[] = [];

  constructor(private common: CommonService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['isToggleSelected']) {
      this.resetData();
      const toggleSelectedValue = this.isToggleSelected || 'health-it';
      const endPoint = toggleSelectedValue === 'health-it' ? '1/14/2021' : '2/14/2021';
      console.log("Amitesh", this.isToggleSelected);
      this.common.getData(endPoint).subscribe(data => {
        this.post = data;
        this.keys = Object.keys(this.post);
        this.prospectiveDevelopment();
      });
    }
  }

  ngOnInit() {

  }

  resetData(): void {
    this.chartOptions = [];
    this.averages = [];
    this.halfOfDevelopment = [];
    this.halfofBuilding = [];
    this.prospectiveDevelopmentData = [];
  }

  prospectiveDevelopment() {
    for (const key of this.keys) {
      if (key === 'Prospective Development') {
        const unsortedCategoryKeys = Object.keys(this.post[key]);

        const sortedCategoryKeys = unsortedCategoryKeys.sort((a, b) => a.localeCompare(b));
        this.catagoryKey = sortedCategoryKeys;
        this.prospectiveDevelopmentData = sortedCategoryKeys.map((sortedKey) => this.post[key][sortedKey]);
        this.calculateAverage();
      }
    }
  }

  calculateAverage(): void {
    this.prospectiveDevelopmentData.forEach((category: any) => {
      let totalScore = 0;

      if (category && Array.isArray(category)) {
        category.forEach((item: { score: string; ultimate_name: string }, index: number) => {
          const score = parseInt(item.score, 10);

          const halfScore = Math.round(score / 2);
          if (index == 0) {
            this.halfOfDevelopment.push({ score: halfScore, name: item.ultimate_name });
          } else if (index === 1) {
            this.halfofBuilding.push({ score: halfScore, name: item.ultimate_name });
          }

          totalScore += score;
        });
      }
      const average = totalScore / 2;
      this.averages.push(Math.round(average));
    });


    this.generateChartOptions();
  }

  generateChartOptions(): void {

    this.chartOptions = [];


    this.averages.forEach((average, index) => {
      const buildingData = this.halfofBuilding[index] || { score: 0, name: 'N/A' };
      const developmentData = this.halfOfDevelopment[index] || { score: 0, name: 'N/A' };
      this.chartOptions.push(this.createPieChart(average, buildingData, developmentData));
    });
  }

  createPieChart(score: number, buildingData: any, developmentData: any): any {
    const remaining = 100 - score;

    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}%'
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
            { value: buildingData.score, name: buildingData.name, itemStyle: { color: '#2f4770' } },
            { value: developmentData.score, name: developmentData.name, itemStyle: { color: '#0648bf' } },
            { value: remaining, name: '', itemStyle: { color: '#e0e0e0' } }
          ]
        }
      ]
    };
  }
}
