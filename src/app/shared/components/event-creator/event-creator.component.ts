import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { getUserInfo, State } from 'src/app/core';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-event-creator',
  templateUrl: './event-creator.component.html',
  styleUrls: ['./event-creator.component.scss']
})
export class EventCreatorComponent implements OnInit {

  @Output() shownToggle = new EventEmitter();

  eventStart = `${new Date().getHours()}:${(new Date().getMinutes()<10?'0':'') + new Date().getMinutes()}`;
  eventEnd = `${new Date().getHours() + 1}:${(new Date().getMinutes()<10?'0':'') + new Date().getMinutes()}`;

  form: FormGroup = new FormGroup({
    eventName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    eventType: new FormControl('event', []),
    eventDate: new FormControl(new Date(), []),
    eventTimeStart: new FormControl(this.eventStart, []),
    eventTimeEnd: new FormControl(this.eventEnd, []),
    eventDescr: new FormControl('', [])
  });

  week = [
    { value: 'sunday', viewValue: 'sunday' },
    { value: 'monday', viewValue: 'monday' },
    { value: 'tuesday', viewValue: 'tuesday' },
    { value: 'wednesday', viewValue: 'wednesday' },
    { value: 'thursday', viewValue: 'thursday' },
    { value: 'friday', viewValue: 'friday' },
    { value: 'saturday', viewValue: 'saturday' },
  ];

  activeUserMail: string | undefined;

  constructor(
    public event: EventService,
    public auth: AuthService,
    private store: Store<State>
  ) { }

  ngOnInit(): void {
    this.store.select(getUserInfo).subscribe(res => {
      this.activeUserMail = res?.email;
    })
  }

  submit() {
    if (this.form.invalid) {
      return;
    }

    this.event.create(this.form.value, this.activeUserMail).pipe(first()).subscribe(() => {
      this.form.reset();
      this.shownToggle.emit();
    });
  }
}
