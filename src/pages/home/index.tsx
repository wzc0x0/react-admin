import React, { lazy } from "react";
import HomeLayout from "@/layout/HomeLayout";
import { Route, Redirect, RouteComponentProps } from "react-router-dom";

export default function Home(props: RouteComponentProps) {
  const { match } = props;
  return (
    <HomeLayout>
      <Redirect exact from={`${match.url}`} to={`${match.url}/table`} />
      <Route
        path={`${match.url}/table`}
        component={lazy(() => import("./Table"))}
      />
      <Route
        path={`${match.url}/chart`}
        component={lazy(() => import("./Chart"))}
      />
      <Route path={`${match.url}/movie`} component={lazy(() => import("./Movie"))}/>
    </HomeLayout>
  );
}
