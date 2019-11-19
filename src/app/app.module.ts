import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {
  EventService,
  EventsListComponent,
  EventThumbnailComponent,
  EventDetailsComponent,
  CreateEventComponent,
  EventRouteActivator,
  EventListResolver,
  CreateSessionComponent,
  SessionListComponent,
  UpvoteComponent,
  VoterService,
  LocationValidator,
  DurationPipe
} from './events/index';
import { EventsAppComponent } from './events-app.component';
import { NavBarComponent } from './nav/navbar.component';
import { TOASTR_TOKEN, Toastr, JQ_TOKEN, CollapsibleWellComponent, SimpleListComponent, ModalTriggerDirective } from './common/index';
import { RouterModule } from '@angular/router';
import { appRotes } from 'src/app/routes';
import { Error404Component } from './errors/404.components';
import { AuthService } from './user/auth.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// tslint:disable-next-line: prefer-const
let toastr: Toastr;
const jQuery = window['$'];

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(appRotes)
  ],
  declarations: [
    EventsAppComponent,
    EventsListComponent,
    EventThumbnailComponent,
    EventDetailsComponent,
    NavBarComponent,
    CreateEventComponent,
    Error404Component,
    CreateSessionComponent,
    SessionListComponent,
    CollapsibleWellComponent,
    SimpleListComponent,
    UpvoteComponent,
    ModalTriggerDirective,
    LocationValidator,
    DurationPipe
  ],
  providers: [
    EventService,
    { provide: TOASTR_TOKEN, useValue: toastr, },
    { provide: JQ_TOKEN, useValue: jQuery, },
    EventRouteActivator,
    EventListResolver,
    VoterService,
    AuthService,
    {
      provide: 'canDeactivateCreateEvent',
      useValue: checkDirtyState
    }
  ],
  exports: [RouterModule],
  bootstrap: [EventsAppComponent]
})
export class AppModule { }

export function checkDirtyState(component: CreateEventComponent) {
  if (component.isDirty) {
    return window.confirm('You have not saved this event, do you really want to cancel?');
  }
  return true;
}
