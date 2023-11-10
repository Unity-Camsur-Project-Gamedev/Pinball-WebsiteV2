/* eslint-disable */
import React from "react";

const LiveStreamFrame = () => {
  return (
    <div className="relative w-[90%] xl:w-[75%] 2xl:w-[80%] aspect-video">
      <iframe
        // We'll use the padding bottom technique to maintain 16:9 ratio
        className="absolute w-full h-full"
        allow="fullscreen"
        // src="https://www.youtube.com/embed/dQw4w9WgXcQ"
        width="1280"
        height="720"
        src="https://demo.nanocosmos.de/nanoplayer/embed/1.3.3/nanoplayer.html?group.id=f41e0c23-d082-4426-b79e-3eac9d5070b1&options.adaption.rule=deviationOfMean2&startIndex=0&playback.latencyControlMode=classic"
      ></iframe>
    </div>
  );
};

export default LiveStreamFrame;
