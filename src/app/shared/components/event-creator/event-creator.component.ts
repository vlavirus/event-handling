import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { EventService } from '../../services/event.service';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-event-creator',
  templateUrl: './event-creator.component.html',
  styleUrls: ['./event-creator.component.scss']
})
export class EventCreatorComponent implements OnInit {

  @Output() shownToggle = new EventEmitter();

  form: FormGroup = new FormGroup({
    eventName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    eventType: new FormControl('event', []),
    eventDate: new FormControl(new Date(), []),
    eventDescr: new FormControl('', [])
  });

  week = [
    {value: 'sunday', viewValue: 'sunday'},
    {value: 'monday', viewValue: 'monday'},
    {value: 'tuesday', viewValue: 'tuesday'},
    {value: 'wednesday', viewValue: 'wednesday'},
    {value: 'thursday', viewValue: 'thursday'},
    {value: 'friday', viewValue: 'friday'},
    {value: 'saturday', viewValue: 'saturday'},
  ];

  constructor(
    public event: EventService,
    public auth: AuthService,
  ) { }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.event.create(this.form.value).then(() => {
      this.form.reset();
      this.shownToggle.emit();
    });
  }
}
