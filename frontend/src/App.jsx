import React from "react";

import { CircularProgress } from "@mui/material";
import { Provider } from "react-redux";
import { Route, Routes } from "react-router-dom";
import { HistoryRouter as Router } from "redux-first-history/rr6";

import Layout from "./components/Layout";
import PrivateRoute from "./components/PrivateRoute";
import FourOhFour from "./pages/404";
import { history, store } from "./redux/store";
import { allRoutes as appRoutes } from "./routes";

import "./app.css";

function App() {

  return (
    <Provider store={store}>
      <Router history={history}>
        <Layout>
          <Routes>
            {appRoutes.filter(route => !route.private).map((route) => {
              return (<Route
                key={route.path}
                path={route.path}
                element={
                  <React.Suspense fallback={<CircularProgress />}>
                    <route.component />
                  </React.Suspense>
                }
              />);
            })}
            {appRoutes.filter(route => route.private).map((route) => {
              return (<Route
                key={route.path}
                path={route.path}
                element={
                  <React.Suspense fallback={<CircularProgress />}>
                    <PrivateRoute>
                      <route.component />
                    </PrivateRoute>
                  </React.Suspense>
                }
              />);
            })}
            <Route
              path="*"
              element={<FourOhFour />}
            />
          </Routes>
        </Layout>
      </Router>
    </Provider>
  );
}

export default App;
