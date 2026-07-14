import { matchPath } from "react-router-dom";

export const shouldHideFooter = (pathname: string,routes: string[],) => {
    return routes.some((route) => {
      if (route.includes(":"))
        return matchPath({ path: route, end: true }, pathname);
      return route === pathname;
    });
  };