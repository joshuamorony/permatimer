import { NgModule, ErrorHandler } from '@angular/core';
import { Storage } from '@ionic/storage';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { StopTimingPage } from '../pages/stop-timing/stop-timing';
import { Projects } from '../providers/projects';
import { HoursMinutesSeconds } from '../pipes/hours-minutes-seconds';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    StopTimingPage,
    HoursMinutesSeconds
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    StopTimingPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Storage, Projects]
})
export class AppModule {}
