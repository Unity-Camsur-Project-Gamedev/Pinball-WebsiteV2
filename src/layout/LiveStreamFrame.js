/* eslint-disable */
import React from "react";

const LiveStreamFrame = () => {
  return (
    <div className="relative lg:w-[70%] xl:w-[65%] 2xl:w-[67%] aspect-video">
      <iframe
        // We'll use the padding bottom technique to maintain 16:9 ratio
        className="absolute w-full h-full"
        allow="fullscreen"
        // src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        width="1280"
        height="720"
        src="https://demo.nanocosmos.de/nanoplayer/embed/1.3.3/nanoplayer.html?group.id=94396fd0-0e85-435e-8392-bbe3c8b7908e&options.adaption.rule=deviationOfMean2&startIndex=0&playback.latencyControlMode=classic"
      ></iframe>
    </div>
  );
};

export default LiveStreamFrame;
