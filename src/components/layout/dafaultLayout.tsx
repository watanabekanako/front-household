import * as React from "react";
import DefaultStyle from "../../styles/layout/dafaultLayout.module.scss"
import Navigation from "../Navigation";
const DefaultLayout=({ children }: { children: React.ReactNode }) =>{
 
  return (
    <React.Fragment>
      <Navigation/>
      <div className={DefaultStyle.container}>
        {children}
      </div>
    </React.Fragment>
  );
}
export default DefaultLayout;
