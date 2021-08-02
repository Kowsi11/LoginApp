import { Component, OnInit } from '@angular/core';
import { Chart, registerables } from 'chart.js'

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  chart: any = [];
  constructor() { }

  ngOnInit() {
    Chart.register(...registerables);
    this.chart = new Chart('canvas', {
      type: 'line',
      data: {
        labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
        datasets: [
          {
            label: 'My First dataset',
            data: [2, 4, 8, 11, 60, 62, 68, 91, 557, , 523, 600],
            backgroundColor: 'red',
            borderColor: 'red',
            fill: false,
          },
          {
            label: 'My Second dataset',
            data: [56, 65, 35, 45, 100, 200, 350, 450, 600, 300, 521],
            backgroundColor: 'blue',
            borderColor: 'blue',
            fill: false,
          },
        ]
      }
    }),
      this.chart = new Chart('canvas-1', {
        type: 'bar',
        data: {
          labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
          datasets: [
            {
              label: 'sales-2020',
              data: [200, 257, 390, 400, 455, 500, 557, , 523, 600],
              backgroundColor: 'lightblue',
              borderColor: 'green',

            },
            {
              label: 'sales-2021',
              data: [65, 230, 280, 340, 460, 550, 567, , 543, 521],
              backgroundColor: 'pink',
              borderColor: 'pink',

            },
          ]
        }
      }),
      this.chart = new Chart('canvas-2', {
        type: 'line',
        data: {
          labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
          datasets: [
            {
              label: 'sales-2020',
              data: [300, 350, 390, 400, 500, 505, 520, , 530, 540, 590],
              backgroundColor: 'violet',
              borderColor: 'violet',
              fill: false

            },
            {
              label: 'sales-2021',
              data: [65, 230, 280, 340, 460, 550, 567, , 543, 521],
              backgroundColor: 'orange',
              borderColor: 'orange   ',
              fill: true

            },
          ]
        }
      }),
      this.chart = new Chart('canvas-3', {
        type: 'bar',
        data: {
          labels: ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'],
          datasets: [
            {
              label: 'sales-2020',
              data: [200, 257, 390, 400, 455, 500, 557, , 523, 540, 590],
              backgroundColor: 'blue',
              borderColor: 'blue',

            },
            {
              label: 'sales-2021',
              data: [65, 230, 280, 340, 460, 550, 567, , 543, 521],
              backgroundColor: 'darkpink',
              borderColor: 'darkpink',

            },
          ]
        }
      })

  }

}
