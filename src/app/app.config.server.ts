import { RenderMode, ServerRoute, provideServerRendering, withRoutes } from '@angular/ssr';
import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { appConfig } from './app.config';

const serverRoutes: ServerRoute[] = [
  { path: 'movies/:id', renderMode: RenderMode.Server },
  { path: '**', renderMode: RenderMode.Prerender },
];

const serverConfig: ApplicationConfig = {
  providers: [provideServerRendering(withRoutes(serverRoutes))],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
