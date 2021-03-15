import { FormControl, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-event-popup',
  templateUrl: './event-popup.component.html',
  styleUrls: ['./event-popup.component.scss']
})
export class EventPopupComponent implements OnInit {

  eventName: string = '';
  eventDate: string = '';
  userName: string = '';

  timeStart = new Date(this.data.eventTimeStart * 1000);
  timeEnd = new Date(this.data.eventTimeEnd * 1000);
  eventStart = new Date(this.timeStart.getTime() - this.timeStart.getTimezoneOffset()*60000).toISOString().substring(0,19);
  eventEnd = new Date(this.timeEnd.getTime() - this.timeEnd.getTimezoneOffset()*60000).toISOString().substring(0,19);

  isEventEdit = false;

  form = new FormGroup({
    eventType: new FormControl(this.data.eventType, []),
    eventName: new FormControl(this.data.eventName, []),
    eventDescr: new FormControl(this.data.eventDescr, []),
    eventTimeStart: new FormControl(this.eventStart, []),
    eventTimeEnd: new FormControl(this.eventEnd, []),
    eventDate: new FormControl(new Date(this.data.eventDate * 1000), [])
  });

  constructor(
    public events: EventService,
    public popupRef: MatDialogRef<EventPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {}

  onNoClick(): void {
    this.popupRef.close();
  }

  deleteEvent(): void {
    this.events.deleteEvent(this.data.id);
    this.editAccountToggle();
    this.onNoClick();
  }

  updateEvent(): void {
    this.events.updateEvent(this.data.id, this.form.value);
    this.editAccountToggle();
    this.onNoClick();
  }

  editAccountToggle(): void {
    this.isEventEdit = !this.isEventEdit;
  }

  complete(): void {
    this.events.done(this.data.id);
    this.onNoClick();
  }
}
