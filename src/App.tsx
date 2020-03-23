import React, { Suspense, lazy } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "antd/dist/antd.css";

import PageLoading from "@/components/PageLoading";

const App: React.FC = () => {
  return (
    <Router>
      <Suspense fallback={<PageLoading />}>
        <Switch>
          <Route
            exact
            path="/"
            component={lazy(() => import("@/pages/Index/Page"))}
          />
          <Route path="/home" component={lazy(() => import("@/pages/home"))} />
          <Route
            path="/login"
            component={lazy(() => import("@/pages/loginRegister/login"))}
          />
          <Route
            path="/register"
            component={lazy(() => import("@/pages/loginRegister/register"))}
          />
          <Route
            path="/error/:type"
            component={lazy(() => import("@/pages/Error"))}
          />
          <Route path="*" component={lazy(() => import("@/pages/Error"))} />
        </Switch>
      </Suspense>
    </Router>
  );
};
export default App;
