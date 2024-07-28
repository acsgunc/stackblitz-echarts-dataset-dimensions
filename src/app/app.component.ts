import { Component } from '@angular/core';
import * as echarts from 'echarts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  chart: any;
  currentDatasetIndex = 0;

  ngOnInit(): void {
    this.initChart();
  }

  initChart() {
    const chartDom = document.getElementById('main')!;
    this.chart = echarts.init(chartDom);

    const option = {
      title: {
        text: 'Time vs Data'
      },
      tooltip: {
        trigger: 'axis',
        axisPointer: {
          type: 'cross'
        },
        formatter: (params: any) => {
          const date = new Date(params[0].data.time);
          const value = params[0].data.value;
          return `Time: ${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}<br/>Value: ${value}`;
        }
      },
      dataset: [
        {
          dimensions: ['time', 'value'],
          source: this.generateData()
        },
        {
          dimensions: ['time', 'value'],
          source: this.generateData()
        }
      ],
      xAxis: {
        type: 'time',
        axisLabel: {
          formatter: (value: any) => {
            const date = new Date(value);
            return `${date.getHours()}:${date.getMinutes() < 10 ? '0' : ''}${date.getMinutes()}`;
          }
        }
      },
      yAxis: {
        type: 'value'
      },
      series: [
        {
          type: 'line',
          encode: { x: 'time', y: 'value' }, // Using dimensions for encoding
          datasetIndex: this.currentDatasetIndex,
        }
      ]
    };

    this.chart.setOption(option);
  }

  generateData() {
    const data = [];
    const now = new Date();
    for (let i = 0; i < 60; i++) {
      const time = new Date(now.getTime() - (59 - i) * 60 * 1000);
      data.push({ time, value: Math.floor(Math.random() * 100) });
    }
    return data;
  }

  switchDataset() {
    this.currentDatasetIndex = (this.currentDatasetIndex + 1) % 2; // Toggle between 0 and 1
    this.updateChart();
  }

  updateChart() {
    this.chart.setOption({
      series: [
        {
          datasetIndex: this.currentDatasetIndex,
        }
      ]
    });
  }
}
