/* eslint-disable */
import React, { useState, createContext, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";

import { postBet } from "../services/postBet";
import { repeatBet } from "../services/repeatBet";

//redux
import { useSelector, useDispatch } from "react-redux";
import {
  setBetAmount,
  IncrementBetAmount,
  setInitialbet,
  setConfirmedBet,
} from "../Slice/BettingSlice";
import { setSelectedColorIndex } from "../Slice/ButtonSlice";

const initialState = {
  clearBetsOnColor: false,
  handleRepeatBet: () => {},
  handleInputChange: () => {},
  handleClearBet: () => {},
  handleConfirmBet: () => {},
  handleBetOnColor: () => {},
  handleButtonClick: () => {},
  handleClearButton: () => {},
  handleClearButtonMobile: () => {},
  handleMaxButton: () => {},
  handleInputButtonClick: () => {},
};

//create initial context
const LiveStreamContext = createContext(initialState);

export const LiveStreamProvider = ({ children, clearBetsOnColor }) => {
  //redux states
  const dispatch = useDispatch();
  const userToken = Cookies.get("token");
  const credits = useSelector((state) => state.user.credits);
  const betAmount = useSelector((state) => state.betting.betAmount);
  const colorName = useSelector((state) => state.button.colorName);
  const initialBet = useSelector((state) => state.betting.initialBet);
  const betHistory = useSelector((state) => state.user.betHistory);

  //RESET WHEN THE RESULT WAS GENERATED
  useEffect(() => {
    dispatch(setInitialbet([]));
    dispatch(setConfirmedBet([]));
  }, [clearBetsOnColor]);

  //NUMPAD INPUT HANDLER
  const handleButtonClick = (value) => {
    const newValue = betAmount + value;
    dispatch(setBetAmount(newValue));
  };

  //KEYBOARD INPUT HANDLER
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, "");
    dispatch(setBetAmount(numericValue));
  };

  //PRE-DEFINED BUTTON INPUT HANDLER
  const handleInputButtonClick = (buttonText) => {
    dispatch(IncrementBetAmount(buttonText));
  };

  //REPEAT BET HANDLER
  const handleRepeatBet = async () => {
    try {
      const response = await repeatBet(userToken);
      const lastBet = response.userBetsLastGame;

      if (lastBet.length > 0) {
        const colors = colorName.map((name, index) => ({
          name,
          index: index,
        }));

        const updatedLastBetArray = lastBet.map((bet) => {
          const colorObject = colors.find(
            (color) => color.name === bet.bet_data
          );
          const colorIndex = colorObject ? colorObject.index : null;

          return { colorIndex, amount: parseInt(bet.amount, 10) };
        });

        // console.log(updatedLastBetArray);

        if (initialBet.length === 0) {
          updatedLastBetArray.forEach((bet) => {
            dispatch(setInitialbet(bet));
          });
        } else {
          window.alert("You have bets already in placed.");
        }
      } else {
        toast.error("You have no bet in the last game ID.", {
          autoClose: 3000,
        });
      }
    } catch (error) {
      // Show a toast notification indicating the user needs to make a bet first
      toast.error("No bets found in the last game.", {
        autoClose: 3000,
      });
    }
  };

  //CLEAR BET HANDLER
  const handleClearBet = () => {
    dispatch(setInitialbet([]));
    // setMirrorArray([...confirmedBetArray]);
    dispatch(setBetAmount("0"));
  };

  //MAX BUTTON HANDLER
  const handleMaxButton = () => {
    dispatch(setBetAmount(credits));
  };

  //OLD CLEAR BUTTON HANDLER
  const handleClearButton = () => {
    dispatch(setBetAmount("0"));
  };

  //CLEAR BUTTON HANDLER MOBILE
  const handleClearButtonMobile = () => {
    dispatch(setBetAmount("0"));
    dispatch(setInitialbet([]));
    // setMirrorArray([...confirmedBetArray]);
  };

  const handleConfirmBet = async () => {
    //This will eliminate duplicated bets and will sum it
    const totalAmounts = initialBet.reduce((acc, bet) => {
      const { colorIndex, amount } = bet;
      if (!acc[colorIndex]) {
        acc[colorIndex] = { colorIndex, amount: 0 };
      }
      acc[colorIndex].amount += amount;
      return acc;
    }, {});

    const result = Object.values(totalAmounts);
    const totalBet = result.reduce((total, bet) => total + bet.amount, 0);

    if (result.length > 0 && totalBet <= credits) {
      // post the result
      try {
        for (const bet of result) {
          await postBet(colorName[bet.colorIndex], bet.amount, userToken);
        }
      } catch (error) {
        toast.error(
          "An error occurred while placing the bet. Please try again later.",
          {
            autoClose: 3000,
          }
        );
      }
      // console.log("POST: ", result);
      //intialbet to confirmedbet
      // dispatch(setConfirmedBet(result));
      //reset initialbet
      dispatch(setInitialbet([]));
    } else {
      toast.error("Your bet is invalid.", {
        autoClose: 3000,
      });
    }
  };

  //COLOR BUTTON HANDLER
  const handleBetOnColor = (key) => {
    dispatch(setSelectedColorIndex(key));
    const betAmountInt = parseInt(betAmount);
    if (!isNaN(betAmountInt) && betAmountInt > 0) {
      if (credits > 0) {
        if (credits >= betAmountInt) {
          dispatch(setInitialbet({ colorIndex: key, amount: betAmountInt }));
          dispatch(setBetAmount("0"));
        } else {
          toast.error("Insufficient Credits. Please enter a valid number.");
        }
      } else {
        toast.warning("Insufficient Credits. Please add credits to bet.");
      }
    } else {
      toast.warning("Input amount first.");
    }
  };

  return (
    <LiveStreamContext.Provider
      value={{
        clearBetsOnColor,
        handleInputChange,
        handleConfirmBet,
        handleRepeatBet,
        handleClearBet,
        handleBetOnColor,
        handleButtonClick,
        handleClearButton,
        handleClearButtonMobile,
        handleMaxButton,
        handleInputButtonClick,
      }}
    >
      {children}
    </LiveStreamContext.Provider>
  );
};

//create the useContext
const useLiveStream = () => {
  const context = useContext(LiveStreamContext);

  if (context === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};

export default useLiveStream;
