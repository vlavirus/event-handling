import { FormControl, FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { EventService } from '../../services/event.service';

@Component({
  selector: 'app-event-popup',
  templateUrl: './event-popup.component.html',
  styleUrls: ['./event-popup.component.scss']
})
export class EventPopupComponent implements OnInit {

  eventName: string = '';
  eventDate: any = '';
  userName: string = '';

  isEventEdit = false;

  form = new FormGroup({
    eventType: new FormControl(this.data.eventType, []),
    eventName: new FormControl(this.data.eventName, []),
    eventDescr: new FormControl(this.data.eventDescr, []),
    eventDate: new FormControl(this.data.eventDate, [])
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
  }

  public editAccountToggle(): void {
    this.isEventEdit = !this.isEventEdit;
  }
}
