import React, { type ReactElement } from 'react';
import { Route } from 'react-router-dom';

export const getRoutes = (AllRoute: any[]): ReactElement => (
  <React.Fragment>
    {AllRoute.map((route) => {
      if (route.type === "layout" && route.children) {
        return (
          <Route key={route.key} element={route.component}>
            {getRoutes(route.children)}
          </Route>
        );
      }

      if (route.type === "link" && route.route) {
        return (
          <Route key={route.key} path={route.route} element={route.component} />
        );
      }
      return null;
    })}
  </React.Fragment>
);