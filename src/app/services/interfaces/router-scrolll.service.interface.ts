import { NavigationEnd, NavigationStart, Route } from '@angular/router';

export interface RouterScrolls {
  setCustomViewportToScroll(viewport: HTMLElement): void;

  disableScrollDefaultViewport(): void;

  enableScrollDefaultViewPort(): void;

  addStrategyOnceBeforeNavigationForPartialRoute(
    partialRoute: string,
    behaviour: RouteScrollBehaviour
  ): void;

  addStrategyForPartialRoute(
    partialRoute: string,
    behaviour: RouteScrollBehaviour
  ): void;

  removeStrategyForPartialRoute(partialRoute: string): void;
}

export interface ScrollPositionRestore {
  event: NavigationStart | NavigationEnd;
  positions: Record<string, any>;
  trigger: 'imperative' | 'popstate' | 'hashchange' | undefined;
  idToRestore: number;
  routeData?: CustomRouteData;
}

export interface RouteScrollStrategy {
  partialRoute: string;
  behaviour: RouteScrollBehaviour;
  onceBeforeNavigation?: boolean;
}

export enum RouteScrollBehaviour {
  KEEP_POSITION = 'KEEP_POSITION',
  GO_TO_TOP = 'GO_TO_TOP',
}

export interface CustomRouteData {
  scrollBehavior?: RouteScrollBehaviour;
}

export interface CustomRoute extends Route {
  data?: CustomRouteData;
}

export type CustomRoutes = CustomRoute[];

// &https://gist.github.com/dsebastien/1211242afa31e00b2d19fdc3dc6db5e6#file-router-scrolll-service-intf-ts */
