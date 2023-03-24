import * as React from "react";
import { useLocation } from "react-router-dom";
import DefaultStyle from "../../styles/layout/defaultLayout.module.scss";
import Navigation from "../Navigation";
const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();
  const currentLocation: string = location.pathname;

  return (
    <React.Fragment>
      {["/", "/login"].includes(currentLocation) ? "" : <Navigation />}
      <div className={DefaultStyle.container}>{children}</div>
    </React.Fragment>
  );
};
export default DefaultLayout;
