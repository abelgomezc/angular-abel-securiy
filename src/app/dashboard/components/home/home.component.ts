import { Component, OnInit } from '@angular/core';
import { ChartModule } from 'primeng/chart';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [ChartModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  dataPie: any;

  optionsPie: any;

  dataStackedBar: any;

  optionsStackedBar: any;


  dataRadar: any ;
   optionsRadar : any;

  ngOnInit() {
      const documentStyle = getComputedStyle(document.documentElement);
      const textColor = documentStyle.getPropertyValue('--text-color');

      this.dataPie = {
          labels: ['A', 'B', 'C'],
          datasets: [
              {
                  data: [300, 50, 100],
                  backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500')],
                  hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400')]
              }
          ]
      };
      this.optionsPie = {
          cutout: '60%',
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          }
      };

      const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
      const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

      this.dataStackedBar = {
          labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
          datasets: [
              {
                  type: 'bar',
                  label: 'Dataset 1',
                  backgroundColor: documentStyle.getPropertyValue('--blue-500'),
                  data: [50, 25, 12, 48, 90, 76, 42]
              },
              {
                  type: 'bar',
                  label: 'Dataset 2',
                  backgroundColor: documentStyle.getPropertyValue('--green-500'),
                  data: [21, 84, 24, 75, 37, 65, 34]
              },
              {
                  type: 'bar',
                  label: 'Dataset 3',
                  backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
                  data: [41, 52, 24, 74, 23, 21, 32]
              }
          ]
      };

      this.optionsStackedBar = {
          maintainAspectRatio: false,
          aspectRatio: 0.8,
          plugins: {
              tooltip: {
                  mode: 'index',
                  intersect: false
              },
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              x: {
                  stacked: true,
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              },
              y: {
                  stacked: true,
                  ticks: {
                      color: textColorSecondary
                  },
                  grid: {
                      color: surfaceBorder,
                      drawBorder: false
                  }
              }
          }
      };





      
      this.dataRadar = {
          labels: ['Eating', 'Drinking', 'Sleeping', 'Designing', 'Coding', 'Cycling', 'Running'],
          datasets: [
              {
                  label: 'My First dataset',
                  borderColor: documentStyle.getPropertyValue('--bluegray-400'),
                  pointBackgroundColor: documentStyle.getPropertyValue('--bluegray-400'),
                  pointBorderColor: documentStyle.getPropertyValue('--bluegray-400'),
                  pointHoverBackgroundColor: textColor,
                  pointHoverBorderColor: documentStyle.getPropertyValue('--bluegray-400'),
                  data: [65, 59, 90, 81, 56, 55, 40]
              },
              {
                  label: 'My Second dataset',
                  borderColor: documentStyle.getPropertyValue('--pink-400'),
                  pointBackgroundColor: documentStyle.getPropertyValue('--pink-400'),
                  pointBorderColor: documentStyle.getPropertyValue('--pink-400'),
                  pointHoverBackgroundColor: textColor,
                  pointHoverBorderColor: documentStyle.getPropertyValue('--pink-400'),
                  data: [28, 48, 40, 19, 96, 27, 100]
              }
          ]
      };
      
      this.optionsRadar = {
          plugins: {
              legend: {
                  labels: {
                      color: textColor
                  }
              }
          },
          scales: {
              r: {
                  grid: {
                      color: textColorSecondary
                  },
                  pointLabels: {
                      color: textColorSecondary
                  }
              }
          }
      };
  }

}
