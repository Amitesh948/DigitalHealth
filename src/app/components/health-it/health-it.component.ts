import { Component } from '@angular/core';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-health-it',
  standalone: false,
  templateUrl: './health-it.component.html',
  styleUrls: ['./health-it.component.css']
})
export class HealthItComponent {
  constructor(private common:CommonService){}
  post: any[] = [];
  averages: number[] = [];
  chartOptions: any[] = [];


  ngOnInit() {
    this.common.getData('1/14/2021').subscribe(data => {
      this.post = data;
      console.log("Data received:", this.post);
      this.calculateAverages(this.post);
      console.log("Calculated Averages:", this.averages);
      this.generateChartOptions();
    });
  }

  calculateAverages(data: any): void {
    const categories = [
      "AI Workforce/Infrastructure",
      "Healthcare Governance",
      "Healthcare workforce and Infrastructure",
      "IT Governance",
      "IT Workforce & Infrastructure",
    ];

    const prospectiveData = data["Prospective Development"];
    categories.forEach(category => {
      let sum = 0;
      if (prospectiveData[category]) {
        sum = prospectiveData[category].reduce((acc: number, item: { score: string; }) => acc + parseInt(item.score, 10), 0);
      }
      const average = sum / 2;
      this.averages.push(Math.round(average));
    });
  }

  generateChartOptions(): void {
    this.averages.forEach((average, index) => {
      const colors = this.getChartColors(index);
      this.chartOptions.push(this.createPieChart(average, colors));
    });
  }

  getChartColors(index: number): string[] {
    const colorSets = [
      ['#2f4770', '#0648bf'], // Chart 1
      ['#2f4770', '#0648bf'], // Chart 1
      ['#2f4770', '#0648bf'], // Chart 2
      ['#2f4770', '#0648bf'], // Chart 3
      ['#2f4770', '#0648bf'], // Chart 4
      ['#2f4770', '#0648bf'], // Chart 5
    ];
    return colorSets[index] || ['#CCCCCC', '#999999']; // Default colors if index exceeds predefined sets
  }

  createPieChart(score: number, colors: string[]): any {
    const halfScore = score / 2; // Half the score for each colored section
    const remaining = 100 - score; // Remaining portion (gray)

    return {
      tooltip: {
        trigger: 'item',
        formatter: '{b}: {c}%' // Tooltip to show category and percentage
      },
      series: [
        {
          type: 'pie',
          radius: ['30%', '50%'],
          label: {
            show: true,
            position: 'center',
            formatter: `${score}%`, // Show the total score in the center
            fontSize: 30,
            fontWeight: 'bold',
            color: '#333',
          },
          data: [
            { value: halfScore, name: 'Capicity building', itemStyle: { color: colors[0] } },
            { value: halfScore, name: 'Development strategy', itemStyle: { color: colors[1] } },
            { value: remaining, name: '', itemStyle: { color: '#e0e0e0' } }
          ]
        }
      ]
    };
  }  
}
