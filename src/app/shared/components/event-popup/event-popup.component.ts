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
  eventDate: any = '';
  userName: string = '';
  eventStart = this.data.eventTimeStart;
  eventEnd = this.data.eventTimeEnd;

  isEventEdit = false;

  form = new FormGroup({
    eventType: new FormControl(this.data.eventType, []),
    eventName: new FormControl(this.data.eventName, []),
    eventDescr: new FormControl(this.data.eventDescr, []),
    eventTimeStart: new FormControl(this.data.eventTimeStart, []),
    eventTimeEnd: new FormControl(this.data.eventTimeEnd, []),
    eventDate: new FormControl(new Date(this.data.eventDate * 1000), [])
  });

  constructor(
    public events: EventService,
    public popupRef: MatDialogRef<EventPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.popupRef.close();
  }

  deleteEvent() {
    this.events.deleteEvent(this.data.id);
  }

  updateEvent() {
    this.events.updateEvent(this.data.id, this.form.value);
    this.editAccountToggle();
    this.onNoClick();
  }

  public editAccountToggle(): void {
    this.isEventEdit = !this.isEventEdit;
  }
}
