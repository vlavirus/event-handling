import { Store } from '@ngrx/store';
import { first } from 'rxjs/operators';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

import { getUserInfo, State } from 'src/app/core';
import { EMAIL_REGEXP } from 'src/app/constants/regexp';
import { AuthService } from 'src/app/shared/services/auth.service';
import { EventService } from 'src/app/shared/services/event.service';

@Component({
  selector: 'app-event-creator',
  templateUrl: './event-creator.component.html',
  styleUrls: ['./event-creator.component.scss']
})
export class EventCreatorComponent implements OnInit {

  @Output() shownToggle = new EventEmitter();

  currentDate = new Date();
  eventStart = new Date(this.currentDate.getTime() - this.currentDate.getTimezoneOffset()*60000).toISOString().substring(0,19);
  eventEnd = new Date((this.currentDate.getTime() + 3600000) - this.currentDate.getTimezoneOffset()*60000).toISOString().substring(0,19);

  form: FormGroup = new FormGroup({
    eventName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    eventType: new FormControl('event', []),
    eventTimeStart: new FormControl(this.eventStart, []),
    eventTimeEnd: new FormControl(this.eventEnd, []),
    eventGuests: new FormControl([], []),
    eventDescr: new FormControl('', [])
  });

  guestForm = new FormGroup({
    guest: new FormControl('', [])
  })

  week = [
    { value: 'sunday', viewValue: 'sunday' },
    { value: 'monday', viewValue: 'monday' },
    { value: 'tuesday', viewValue: 'tuesday' },
    { value: 'wednesday', viewValue: 'wednesday' },
    { value: 'thursday', viewValue: 'thursday' },
    { value: 'friday', viewValue: 'friday' },
    { value: 'saturday', viewValue: 'saturday' }
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

  EnterSubmit(event: KeyboardEvent, form: FormGroup) {
    if (event.keyCode === 13) {
      const addEmails = form.get('guest')?.value.match(EMAIL_REGEXP);
      const currentEmails = this.form.get('eventGuests')?.value;

      this.form.get('eventGuests')?.value.push(...addEmails
        .filter((email: string) => !currentEmails.find((currentEmail: string) => currentEmail === email))
      );

      form.reset();
    }
  }
}
