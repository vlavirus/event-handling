import { first } from 'rxjs/operators';
import { Color, Label } from 'ng2-charts';
import { Component, OnInit } from '@angular/core';
import { ChartDataSets, ChartOptions, ChartType } from 'chart.js';

import { MONTH_DAY_COUNT } from 'src/app/shared/constants/date';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-dashboard-results',
  templateUrl: './dashboard-results.component.html',
  styleUrls: ['./dashboard-results.component.scss']
})
export class DashboardResultsComponent implements OnInit {

  doneEventsCount: number[] = [];
  activeEventsCount: number[] = [];

  lineChartData: ChartDataSets[] = [
    { data: this.activeEventsCount, label: 'Active Events' },
    { data: this.doneEventsCount, label: "Done Events" }
  ];

  lineChartLabels: Label[] = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  lineChartOptions: (ChartOptions & { annotation: any }) = {
    annotation: undefined,
    responsive: true,
    scales: {
      yAxes: [{
        ticks: {
          stepSize: 1
        }
      }]
    }
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'none',
      backgroundColor: 'rgba(255, 0, 0, 0.3)',
    },
  ];

  lineChartLegend = true;
  lineChartType: ChartType = 'line';
  lineChartPlugins = [];

  constructor(public event: EventService) {}

  ngOnInit(): void {
    MONTH_DAY_COUNT.forEach((days, index) => {
      this.event.getActiveEvents(index, days).pipe(
        first()
      ).subscribe((res: number) => {
        this.activeEventsCount[index] = res;
      });
    })

    MONTH_DAY_COUNT.forEach((days, index) => {
      this.event.getDoneEvents(index, days).pipe(
        first()
      ).subscribe((res: number) => {
        this.doneEventsCount[index] = res;
      })
    })
  }

}
