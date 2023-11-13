import React from "react";
import MobileResponsive2 from "../MobileResponsive2";
import BetHistory from "../BetHistory";

function Mobile({ userToken }) {
  return (
    <>
      <div className="lg:hidden">
        <MobileResponsive2 />
        <BetHistory userToken={userToken} />
      </div>
    </>
  );
}

export default Mobile;
