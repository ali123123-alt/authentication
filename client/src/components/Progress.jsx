import React from "react";
import { Link, useLocation } from "react-router-dom";

const Progress = () => {
  const location = useLocation();
  const pathname = location.pathname;
  console.log(pathname);
  const isFirstStep = pathname === "/";
  const isSecondStep = pathname === "/second";
  const isThirdStep = pathname === "/third";
  return (
    <React.Fragment>
      <div className="steps">
        <div className={`${isFirstStep ? "step active" : "step"}`}>
          <div>1</div>
          <div>
            {isSecondStep || isThirdStep ? (
              <Link to="/">Step 1</Link>
            ) : (
              "Step 1"
            )}
          </div>
        </div>
        <div className={`${isSecondStep ? "step active" : "step"}`}>
          <div>2</div>
          <div>{isThirdStep ? <Link to="/second">Step 2</Link> : "Step 2"}</div>
        </div>
        <div className={`${pathname === "/third" ? "step active" : "step"}`}>
          <div>3</div>
          <div>Step 3</div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Progress;
