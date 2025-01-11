import { Component, effect } from '@angular/core';
import { CommonService } from '../../../services/common.service';

@Component({
  selector: 'app-radarchart',
  standalone: false,
  templateUrl: './radarchart.component.html',
  styleUrls: ['./radarchart.component.css']
})
export class RadarchartComponent {
  selectedOption = 'present-development';
  radarChartOptions: any = {};
  initialEntry: boolean = false;

  constructor(private common: CommonService) {

    effect(() => {
      this.common.headerToggleButtonSignal.set('Comparative');
      const value1 = this.common.presentValueSignal();
      const value2 = this.common.prospectiveValueSignal();

      if (this.initialEntry) {
        this.showDataInChart(value1, value2);
      }
      this.initialEntry = true;
    });
  }


  showDataInChart(value1: any, value2: any) {
    const data = this.selectedOption === 'present-development' ? value1 : value2;
    data.sort((a: any, b: any) => a.taxonomyKey.localeCompare(b.taxonomyKey)).reverse();

    const firstCountryValues = data.map((item: any) => item.countryData.firstCountry);
    const secondCountryValues = data.map((item: any) => item.countryData.secondCountry);
    const minData1 = Math.min(...firstCountryValues)
    const minData2 = Math.min(...secondCountryValues)
    const minPoint = minData1 < minData2 ? minData1 : minData2

    const indicators = data.map((item: any) => ({
      name: item.taxonomyKey,
      max: 100,
      min: minPoint
    }));

    const firstCountryName = data[0].countryName.firstCountry;
    const secondCountryName = data[0].countryName.secondCountry;

    this.radarChartOptions = {
      tooltip: {
        trigger: 'item',
        formatter: (params: any) => {
          if (params.seriesName === 'Corner Points') {
            console.log(params);
            
            const hoveredIndex = params.dataIndex;
            const indicator = indicators[hoveredIndex];
            
            const name = indicator.nam;
            const firstCountryValue = firstCountryValues[hoveredIndex];
            const secondCountryValue = secondCountryValues[hoveredIndex];


            return `
              ${name}: <br>
              ${firstCountryName}: ${firstCountryValue}% <br>
              ${secondCountryName}: ${secondCountryValue}%
            `;
          }
          return '';
        },
        backgroundColor: 'rgba(0, 0, 0, 0.7)', 
        borderColor: '#fff',  
        borderWidth: 1,  
        padding: [10, 15], 
        textStyle: {
          color: '#fff',  
        }
      },
      legend: false,
      radar: {
        splitNumber: 10,
        indicator: indicators,
        axisName: {
          color: '#333',
          fontSize: 12
        },
        startAngle: 164,
      },
      series: [
        {
          name: 'Country Comparison',
          type: 'radar',
          data: [
            {
              value: firstCountryValues,
              name: firstCountryName,
              areaStyle: {
                color: 'rgba(171, 142, 176, 0.3)'
              },
              lineStyle: {
                color: '#ab8eb0'
              },
              symbol: 'none'  
            },
            {
              value: secondCountryValues,
              name: secondCountryName,
              areaStyle: {
                color: 'rgba(76, 175, 80, 0.3)'
              },
              lineStyle: {
                color: '#68c591'
              },
              symbol: 'none'  
            }
          ]
        },
        {
          name: 'Corner Points',
          type: 'radar',
          data: [
            {
              value: indicators.map(() => 100), 
              name: '', 
            }
          ],
          symbol: 'circle', 
          symbolSize: 8,   
          itemStyle: {
            color: 'grey'
          }
        }
      ]
    };


  }

  onToggleChange(newValue: string): void {
    this.selectedOption = newValue;
    const value1 = this.common.presentValueSignal();
    const value2 = this.common.prospectiveValueSignal();
    this.showDataInChart(value1, value2);
  }
}
