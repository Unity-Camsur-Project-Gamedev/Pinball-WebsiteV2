/* eslint-disable */
import React, { useState, createContext, useContext, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { postBet } from "../services/postBet";
import { repeatBet } from "../services/repeatBet";

const initialState = {
  userToken: null,
  isOpen: null,
  colorName: [],
  colorHex: [],
  numGroup1: [],
  numGroup2: [],
  numGroup3: [],
  totalCredits: null,
  betAmount: "",
  selectedButton: null,
  selectedColorName: "",
  selectedColorHex: "",
  betButtons: [],
  userBets: [],
  toBeConfirmedBetArray: [],
  confirmedBetArray: [],
  mirrorArray: [],
  totalCreditsCopy: null,
  clearBetsOnColor: false,
  setMirrorArray: () => {},
  setConfirmedBetArray: () => {},
  setToBeConfirmedBetArray: () => {},
  setUserBets: () => {},
  setIsOpen: () => {},
  setSelectedColorName: () => {},
  setSelectedColorHex: () => {},
  handleInputChange: () => {},
  handleClearBet: () => {},
  handleConfirmBet: () => {},
  handleBetOnColor: () => {},
  handleButtonClick: () => {},
  handleClearButton: () => {},
  handleMaxButton: () => {},
  handleInputButtonClick: () => {},
};

//create initial context
const LiveStreamContext = createContext(initialState);

export const LiveStreamProvider = ({
  children,
  isOpen,
  userToken,
  setIsOpen,
  totalCredits,
  clearBetsOnColor,
}) => {
  const colorName = [
    "Red",
    "Blue",
    "Yellow",
    "Green",
    "Gold",
    "Violet",
    "Orange",
    "Pink",
    "Cyan",
  ];
  const colorHex = [
    "#ED3130",
    "#276ADD",
    "#F4FF63",
    "#56DE33",
    "#FFD700",
    "#9A3FBC",
    "#F08F40",
    "#DC63D0",
    "#33C5ED",
  ];
  const numGroup1 = ["1", "2", "3"];
  const numGroup2 = ["4", "5", "6"];
  const numGroup3 = ["7", "8", "9"];
  const betButtons = ["5", "10", "20", "50", "100"];
  const totalCreditsCopy = localStorage.getItem("totalCredits");
  const [selectedColorName, setSelectedColorName] = useState("");
  const [selectedColorHex, setSelectedColorHex] = useState("");
  const [betAmount, setBetAmount] = useState("0"); //BET AMOUNT TEXT
  const [selectedButton, setSelectedButton] = useState(null); //INDEX OF THE COLOR BUTTON
  const [userBets, setUserBets] = useState([]);
  const [toBeConfirmedBetArray, setToBeConfirmedBetArray] = useState([]); //CONTAINS BETS THAT ARE YET TO POST
  const [confirmedBetArray, setConfirmedBetArray] = useState([]); //CONTAINS CONFIRMED BETS
  const [mirrorArray, setMirrorArray] = useState([]); //MIRROR ARRAY OF CBA

  const [totalBetAmount, setTotalBetAmount] = useState(0);

  useEffect(() => {
    // console.log(clearBetsOnColor);
    setMirrorArray([]);
    setConfirmedBetArray([]);
    setToBeConfirmedBetArray([]);
  }, [clearBetsOnColor]);

  const handleButtonClick = (value) => {
    const newValue = betAmount + value;
    setBetAmount(newValue);
    // console.log(newValue);
  };

  //keyboard input
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    const numericValue = inputValue.replace(/\D/g, "");
    setBetAmount(numericValue);
  };

  const handleInputButtonClick = (buttonText) => {
    setBetAmount((prevAmount) =>
      String(parseInt(prevAmount, 10) + parseInt(buttonText, 10))
    );
  };

  const handleRepeatBet = async () => {
    try {
      await repeatBet(userToken);
    } catch (error) {
      // Show a toast notification indicating the user needs to make a bet first
      toast.error("No bets found in the last game.", {
        autoClose: 3000,
      });
    }
  };

  // const handleConfirmBet = async () => {
  //   if (selectedButton !== null) {
  //     const betAmountInt = parseInt(betAmount);
  //     if (!isNaN(betAmountInt) && betAmountInt > 0) {
  //       if (totalCredits > 0) {
  //         if (totalCredits >= betAmountInt) {
  //           try {
  //             await postBet(selectedColorName, betAmountInt, userToken);
  //             //reset
  //             setSelectedButton(null);
  //             setBetAmount("0");
  //           } catch (error) {
  //             console.error("Error:", error.message);
  //             window.alert(
  //               "An error occurred while placing the bet. Please try again later."
  //             );
  //           }
  //         } else {
  //           window.alert("Insufficient Credits. Please enter a valid number.");
  //         }
  //       } else {
  //         window.alert("Insufficient Credits. Please add credits to bet.");
  //       }
  //     } else {
  //       window.alert("Invalid bet amount. Please enter a valid number.");
  //     }
  //   } else {
  //     window.alert("Select a color bet first");
  //   }
  // };

  const handleConfirmBet = async () => {
    if (totalBetAmount <= totalCreditsCopy) {
      for (const bet of toBeConfirmedBetArray) {
        console.log(colorName[bet.colorIndex], bet.amount);
      }
      //INSERT BETS THAT ARE CONFIRMED
      setConfirmedBetArray((prevArray) => {
        const combinedArray = [...prevArray, ...toBeConfirmedBetArray];

        const aggregatedAmounts = {};

        combinedArray.forEach((bet) => {
          const { colorIndex, amount } = bet;
          aggregatedAmounts[colorIndex] =
            (aggregatedAmounts[colorIndex] || 0) + amount;
        });

        const updatedArray = Object.entries(aggregatedAmounts).map(
          ([colorIndex, amount]) => ({
            colorIndex: parseInt(colorIndex, 10),
            amount,
          })
        );

        return updatedArray;
      });

      console.log("POST", toBeConfirmedBetArray);

      //POST METHOD
      for (const bet of toBeConfirmedBetArray) {
        console.log(colorName[bet.colorIndex], bet.amount);
      }

      try {
        for (const bet of toBeConfirmedBetArray) {
          await postBet(colorName[bet.colorIndex], bet.amount, userToken);
        }
      } catch (error) {
        console.error("Error:", error.message);
        window.alert(
          "An error occurred while placing the bet. Please try again later."
        );
      }

      setToBeConfirmedBetArray([]);
    } else {
      window.alert("Insuffiecient Balance. Please top up your credits.");
    }
  };

  const handleClearBet = () => {
    setToBeConfirmedBetArray([]);
    setMirrorArray([...confirmedBetArray]);
    // setUserBets([]);
  };

  const handleMaxButton = () => {
    setBetAmount(totalCredits);
  };

  const handleClearButton = () => {
    setBetAmount("0");
  };

  // const handleBetOnColor = (key) => {
  //   setSelectedButton(key);

  //   //console logs
  //   setSelectedColorHex(colorHex[key]);
  //   setSelectedColorName(colorName[key]);
  // };

  const handleBetOnColor = (key) => {
    setSelectedButton(key);
    const betAmountInt = parseInt(betAmount);
    if (!isNaN(betAmountInt) && betAmountInt > 0) {
      if (totalCredits > 0) {
        if (totalCredits >= betAmountInt) {
          setToBeConfirmedBetArray((prevArray) => {
            const updatedArray = [...prevArray];
            const existingBetIndex = prevArray.findIndex(
              (bet) => bet.colorIndex === key
            );
            if (existingBetIndex !== -1) {
              updatedArray[existingBetIndex].amount += betAmountInt;
            } else {
              updatedArray.push({ colorIndex: key, amount: betAmountInt });
            }
            return updatedArray;
          });

          setBetAmount("0");
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

  useEffect(() => {
    if (confirmedBetArray.length > 0 || toBeConfirmedBetArray.length > 0) {
      // Combine array1 and array2 into array3 with incrementing amounts
      const combinedArray = [
        ...toBeConfirmedBetArray,
        ...confirmedBetArray,
      ].reduce((accumulator, currentValue) => {
        const existingItem = accumulator.find(
          (item) => item.colorIndex === currentValue.colorIndex
        );

        if (existingItem) {
          // If the colorIndex already exists, increment the amount
          existingItem.amount += currentValue.amount;
        } else {
          // If the colorIndex doesn't exist, add the item to the accumulator
          accumulator.push({ ...currentValue });
        }

        return accumulator;
      }, []);

      const total = combinedArray.reduce((sum, item) => sum + item.amount, 0);

      // Set the state
      setMirrorArray(combinedArray);
      setTotalBetAmount(total);
    }
  }, [confirmedBetArray, toBeConfirmedBetArray]);

  useEffect(() => {
    console.log("toBeConfirmedBetArray: ", toBeConfirmedBetArray);
    console.log("confirmedBetArray: ", confirmedBetArray);
  }, [toBeConfirmedBetArray, confirmedBetArray]);

  useEffect(() => {
    console.log("mirrorArray:", mirrorArray);
  }, [mirrorArray]);

  useEffect(() => {
    console.log("totalBetAmount:", totalBetAmount);
  }, [totalBetAmount]);

  return (
    <LiveStreamContext.Provider
      value={{
        isOpen,
        colorHex,
        numGroup1,
        numGroup2,
        numGroup3,
        totalCredits,
        betAmount,
        selectedButton,
        betButtons,
        setIsOpen,
        userBets,
        toBeConfirmedBetArray,
        confirmedBetArray,
        mirrorArray,
        totalCreditsCopy,
        clearBetsOnColor,
        setMirrorArray,
        setConfirmedBetArray,
        setToBeConfirmedBetArray,
        setUserBets,
        handleInputChange,
        handleConfirmBet,
        handleRepeatBet,
        handleClearBet,
        handleBetOnColor,
        handleButtonClick,
        handleClearButton,
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
