import React, { useCallback, useEffect, useRef, useState } from "react";
import ReactCanvasConfetti from "react-canvas-confetti";
import { Button } from "@mui/material";

const canvasStyles = {
  position: "fixed",
  pointerEvents: "none",
  width: "100%",
  height: "100%",
  zIndex: 50,
  top: 0,
  left: 0,
};

function getAnimationSettings(angle, originX) {
  return {
    particleCount: 5,
    angle,
    spread: 55,
    shapes: ["square", "circle", "star"],
    origin: { x: originX },
    colors: ["#a864fd", "#29cdff", "#78ff44", "#ff718d", "#fdff6a"],
  };
}

export default function Confetti() {
  const [showConfetti, setShowConfetti] = useState(true);
  const [animationStarted, setAnimationStarted] = useState(false);

  const refAnimationInstance = useRef(null);
  const [intervalId, setIntervalId] = useState();

  const getInstance = useCallback((instance) => {
    refAnimationInstance.current = instance;
  }, []);

  const nextTickAnimation = useCallback(() => {
    if (refAnimationInstance.current) {
      refAnimationInstance.current(getAnimationSettings(60, 0));
      refAnimationInstance.current(getAnimationSettings(120, 1));
    }
  }, []);

  const startAnimation = useCallback(() => {
    if (!intervalId) {
      setIntervalId(setInterval(nextTickAnimation, 16));
    }
  }, [nextTickAnimation, intervalId]);

  const pauseAnimation = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
  }, [intervalId]);

  const stopAnimation = useCallback(() => {
    clearInterval(intervalId);
    setIntervalId(null);
    refAnimationInstance.current && refAnimationInstance.current.reset();
  }, [intervalId]);

  useEffect(() => {
    return () => {
      clearInterval(intervalId);
    };
  }, [intervalId]);

  useEffect(() => {
    startAnimation();
    setTimeout(() => {
      pauseAnimation();
    }, 3000);
    setTimeout(() => {
      setShowConfetti(false);
    }, 7000);
  }, []);

  return (
    <>
      {showConfetti && (
        <ReactCanvasConfetti refConfetti={getInstance} style={canvasStyles} />
      )}
    </>
  );
}
