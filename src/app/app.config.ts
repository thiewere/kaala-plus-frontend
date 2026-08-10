import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
                preset: Aura,
                options: {
                  darkModeSelector: '.app-dark'
                },
            },
      license: "eyJpZCI6IjY0NWRlNzUwLTk5YTAtNGZhNi05NDAzLTVlNzVkNWQ5MzY5OCIsInByb2R1Y3QiOiJwcmltZXVpIiwidGllciI6ImNvbW11bml0eSIsInR5cGUiOiJkZXYiLCJpYXQiOjE3ODYwMDMzNjEsImV4cCI6MTgxNzUzOTM2MX0.3m56w7ht45cGkkrDa2cw3ao0-GNYR9JUBCdNP9-MzG8tj-ZwuFE7czsHSx_TN-BJW6kMKF6yScHFme3v_eaKAA"
      
    })
  ]
};
