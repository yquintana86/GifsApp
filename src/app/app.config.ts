import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withFetch, withInterceptors } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(withFetch()),//If you let this without parameters it will use the old XMLHttpRequest (XHR), but if you add withFetch() then it wil return Observable but it will use beneath the observable a fetch
                        //I mean this will happen transparent
  ]
};
