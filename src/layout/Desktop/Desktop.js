import React from "react";
import DesktopResponsive2 from "../DesktopResponsive2";
import BetHistory from "../BetHistory";

function Desktop({ userToken }) {
  return (
    <>
      <div className="hidden max-h-[150vh] w-[80%] lg:flex flex-col gap-10 border-2 border-blue-600">
        <DesktopResponsive2 />
        <BetHistory userToken={userToken} />
      </div>
    </>
  );
}

export default Desktop;
