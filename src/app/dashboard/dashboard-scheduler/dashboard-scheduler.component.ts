import { Component, OnInit } from '@angular/core';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-dashboard-scheduler',
  templateUrl: './dashboard-scheduler.component.html',
  styleUrls: ['./dashboard-scheduler.component.scss']
})
export class DashboardSchedulerComponent implements OnInit {
  sunday = [
    // 'Get to work',
    // 'Pick up groceries',
    // 'Go home',
    // 'Fall asleep'
  ];

  monday = [
    // 'Get up',
    // 'Brush teeth',
    // 'Take a shower',
    // 'Check e-mail',
    // 'Walk dog'
  ];

  tuesday = [];
  wednesday = [];
  thursday = [];
  friday = [];
  saturday = [];

  constructor() { }

  ngOnInit(): void {
  }


  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex);
    }
  }

}
