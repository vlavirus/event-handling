import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-event-creator',
  templateUrl: './event-creator.component.html',
  styleUrls: ['./event-creator.component.scss']
})
export class EventCreatorComponent implements OnInit {

  form: FormGroup = new FormGroup({
    eventName: new FormControl('', [Validators.required, Validators.minLength(5)]),
    eventType: new FormControl('', []),
    eventDate: new FormControl('', []),
    dayOfWeek: new FormControl('', []),
    eventDescr: new FormControl('', [])
  });

  constructor() { }

  ngOnInit(): void {
  }

  submit() {
    if (this.form.invalid) {
      return;
    }
    console.log(this.form.value)
  }

}
