import { NavigationEnd, Router } from '@angular/router';
import { filter, map, Observable } from 'rxjs';


export const routerNavigationEnd = (router: Router): Observable<NavigationEnd> => {
  return router.events.pipe(
    filter(event => event instanceof NavigationEnd),
    map(event => event as NavigationEnd)
  );
};
