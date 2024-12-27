import { Component } from '@angular/core';

@Component({
  selector: 'app-digital-health',
  standalone: false,
  
  templateUrl: './digital-health.component.html',
  styleUrl: './digital-health.component.css'
})
export class DigitalHealthComponent {
  chartOptions = [
    {
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
            formatter: '60%',  // Fixed percentage in the center
            fontSize: 30,
            fontWeight: 'bold',
            color: '#333',
          },
          data: [
            { value: 60, name: 'Capacity Building', itemStyle: { color: '#2f4770' } },
            { value: 26, name: 'Development Strategy', itemStyle: { color: '#0648bf' } },
            { value: 14, itemStyle: { color: '#e0e0e0' } }
          ]
        }
      ]
    },
    {
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
            formatter: '40%',  // Fixed percentage in the center
            fontSize: 30,
            fontWeight: 'bold',
            color: '#333',
          },
          data: [
            { value: 40, name: 'Research', itemStyle: { color: '#2f4770' } },
            { value: 35, name: 'Innovation', itemStyle: { color: '#0648bf' } },
            { value: 25, itemStyle: { color: '#e0e0e0' } }
          ]
        }
      ]
    },
    // Repeat similar objects for more pie charts, changing values as needed
    // Example for the third chart
    {
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
            formatter: '75%',  // Fixed percentage in the center
            fontSize: 30,
            fontWeight: 'bold',
            color: '#333',
          },
          data: [
            { value: 75, name: 'Sustainability', itemStyle: { color: '#2f4770' } },
            { value: 15, name: 'Planning', itemStyle: { color: '#0648bf' } },
            { value: 10, itemStyle: { color: '#e0e0e0' } }
          ]
        }
      ]
    }
    ,{
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
            formatter: '75%',  // Fixed percentage in the center
            fontSize: 30,
            fontWeight: 'bold',
            color: '#333',
          },
          data: [
            { value: 75, name: 'Sustainability', itemStyle: { color: '#2f4770' } },
            { value: 15, name: 'Planning', itemStyle: { color: '#0648bf' } },
            { value: 10, itemStyle: { color: '#e0e0e0' } }
          ]
        }
      ]
    },
    {
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
            formatter: '75%',  // Fixed percentage in the center
            fontSize: 30,
            fontWeight: 'bold',
            color: '#333',
          },
          data: [
            { value: 75, name: 'Sustainability', itemStyle: { color: '#2f4770' } },
            { value: 15, name: 'Planning', itemStyle: { color: '#0648bf' } },
            { value: 10, itemStyle: { color: '#e0e0e0' } }
          ]
        }
      ]
    },
    {
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
            formatter: '75%',  // Fixed percentage in the center
            fontSize: 30,
            fontWeight: 'bold',
            color: '#333',
          },
          data: [
            { value: 75, name: 'Sustainability', itemStyle: { color: '#2f4770' } },
            { value: 15, name: 'Planning', itemStyle: { color: '#0648bf' } },
            { value: 10, itemStyle: { color: '#e0e0e0' } }
          ]
        }
      ]
    },
    {
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
            formatter: '75%',  // Fixed percentage in the center
            fontSize: 30,
            fontWeight: 'bold',
            color: '#333',
          },
          data: [
            { value: 75, name: 'Sustainability', itemStyle: { color: '#2f4770' } },
            { value: 15, name: 'Planning', itemStyle: { color: '#0648bf' } },
            { value: 10, itemStyle: { color: '#e0e0e0' } }
          ]
        }
      ]
    },
    {
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
            formatter: '75%',  // Fixed percentage in the center
            fontSize: 30,
            fontWeight: 'bold',
            color: '#333',
          },
          data: [
            { value: 75, name: 'Sustainability', itemStyle: { color: '#2f4770' } },
            { value: 15, name: 'Planning', itemStyle: { color: '#0648bf' } },
            { value: 10, itemStyle: { color: '#e0e0e0' } }
          ]
        }
      ]
    }
  ];
}
