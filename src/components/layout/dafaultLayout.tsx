import * as React from "react";
import DefaultStyle from "../../styles/layout/dafaultLayout.module.scss"
const DefaultLayout=({ children }: { children: React.ReactNode }) =>{
 
  return (
    <React.Fragment>
      <div className={DefaultStyle.container}>
        {children}
      </div>
    </React.Fragment>
  );
}
export default DefaultLayout;
