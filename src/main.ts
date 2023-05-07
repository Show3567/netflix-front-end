import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch((err) => console.error(err));

/* 
  TODO: all test cases to this project 
  TODO: add charts to somewhere

  ? when you build the application, if there some error said 'bundle initial exceeded maximum budget'
  ? go to angular.json --> 
  "budgets": [
    {
      "type": "initial",
      "maximumWarning": "1mb", <---------------- change the warning limited
      "maximumError": "3mb" <---------------- change the warning limited
    },
    {
      "type": "anyComponentStyle",
      "maximumWarning": "4kb", <---------------- change the warning limited
      "maximumError": "5kb" <---------------- change the warning limited
    }
  ],
  TODO: Add a websocket in this project.
  TODO: Upload video to this app.
  TODO: Add to AWS
  TODO: CICD
*/
