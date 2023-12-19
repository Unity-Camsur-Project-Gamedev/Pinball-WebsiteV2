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
  history: [],
  percentages: [],
  winnersArray: [],
  STEAM_URL: "",
  setBetAmount: () => {},
  handleRepeatBet: () => {},
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
  handleClearButtonMobile: () => {},
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
  history,
  percentages,
  winnersArray,
  rows,
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
  const STEAM_URL =
    "https://demo.nanocosmos.de/nanoplayer/embed/1.3.3/nanoplayer.html?group.id=e8169394-9c9e-402a-aada-00dc3797ecef&options.adaption.rule=deviationOfMean2&startIndex=0&playback.latencyControlMode=classic";
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
  const [onGoingBets, setOnGoingBets] = useState([]);

  const fetchData = async () => {
    try {
      const updatedRows = rows.map((item) => ({
        date: item.createdAt.slice(0, 10),
        gameId: item.game_id,
        bet: item.bet_data,
        betAmount: item.amount,
        winLose: item.status,
        result: item.status === "Win" ? "+ " + item.amount * 7 : 0,
      }));

      // Filter the array to get items with status "On going"
      const onGoingRows = updatedRows.filter(
        (row) => row.winLose === "On going"
      );

      // Create a new array with only "bet" and "betAmount" properties
      const simplifiedOnGoingRows = onGoingRows.map(({ bet, betAmount }) => ({
        colorIndex: colorName.indexOf(bet),
        amount: Number(betAmount),
      }));

      // Combine objects with the same colorIndex and sum their amounts
      const combinedOnGoingRows = simplifiedOnGoingRows.reduce((acc, curr) => {
        const existing = acc.find(
          (item) => item.colorIndex === curr.colorIndex
        );
        if (existing) {
          existing.amount += curr.amount;
        } else {
          acc.push({ colorIndex: curr.colorIndex, amount: curr.amount });
        }
        return acc;
      }, []);

      // Convert the amount property back to a string
      const resultRows = combinedOnGoingRows.map(({ colorIndex, amount }) => ({
        colorIndex,
        amount: amount.toString(),
      }));

      setOnGoingBets(resultRows);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, [rows]);

  useEffect(() => {
    console.log("onGoingBets:", onGoingBets);
  }, [onGoingBets]);

  //CLEAR ARRAYS WHEN THE RESULT WAS GENERATED
  useEffect(() => {
    setMirrorArray([]);
    setConfirmedBetArray([]);
    setToBeConfirmedBetArray([]);
  }, [clearBetsOnColor]);

  const handleButtonClick = (value) => {
    const newValue = betAmount + value;
    setBetAmount(newValue);
  };

  //KEYBOARD INPUT
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

        updatedLastBetArray.forEach((bet) => {
          setToBeConfirmedBetArray((prev) => [...prev, bet]);
        });
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

  //CLEAR THE UNCONFIRMED BETS
  const handleClearBet = () => {
    setToBeConfirmedBetArray([]);
    setMirrorArray([...confirmedBetArray]);
    setBetAmount("0");
    // setUserBets([]);
  };

  const handleMaxButton = () => {
    setBetAmount(totalCredits);
  };

  const handleClearButton = () => {
    setBetAmount("0");
  };

  const handleClearButtonMobile = () => {
    setBetAmount("0");
    setToBeConfirmedBetArray([]);
    setMirrorArray([...confirmedBetArray]);
  };

  //CONFIRM BUTTON
  const handleConfirmBet = async () => {
    if (totalBetAmount <= totalCreditsCopy) {
      for (const bet of toBeConfirmedBetArray) {
        console.log(colorName[bet.colorIndex], bet.amount);
      }
      //INSERT BETS THAT ARE CONFIRMED
      setConfirmedBetArray((prevArray) => {
        const combinedArray = [...onGoingBets, ...toBeConfirmedBetArray];
        const aggregatedAmounts = {};

        combinedArray.forEach((bet) => {
          const { colorIndex, amount } = bet;
          aggregatedAmounts[colorIndex] =
            (aggregatedAmounts[colorIndex] || 0) + Number(amount); // Convert amount to number
        });

        const updatedArray = Object.entries(aggregatedAmounts).map(
          ([colorIndex, amount]) => ({
            colorIndex: parseInt(colorIndex, 10),
            amount: amount.toString(), // Convert amount back to string if necessary
          })
        );
        setToBeConfirmedBetArray([]);

        return updatedArray;
      });

      console.log("POST", toBeConfirmedBetArray);

      //POST METHOD
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
    } else {
      window.alert("Insuffiecient Balance. Please top up your credits.");
    }
  };

  //COLOR BUTTON
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

  //USED TO CHECK IF THE BETS ARE VALID BEFORE CONFIRMING
  useEffect(() => {
    if (onGoingBets.length > 0 || toBeConfirmedBetArray.length > 0) {
      // Combine array1 and array2 into array3 with incrementing amounts

      const combinedArray = [...toBeConfirmedBetArray, ...onGoingBets].reduce(
        (accumulator, currentValue) => {
          const existingItem = accumulator.find(
            (item) => item.colorIndex === currentValue.colorIndex
          );

          if (existingItem) {
            // Convert amounts to numbers before addition
            existingItem.amount =
              Number(existingItem.amount) + Number(currentValue.amount);
          } else {
            accumulator.push({ ...currentValue });
          }

          return accumulator;
        },
        []
      );

      const total = combinedArray.reduce((sum, item) => sum + item.amount, 0);
      const unconfirmedTotal = toBeConfirmedBetArray.reduce(
        (sum, item) => sum + item.amount,
        0
      );

      setMirrorArray(combinedArray);
      setTotalBetAmount(unconfirmedTotal);
    }
  }, [confirmedBetArray, toBeConfirmedBetArray, onGoingBets]);

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
        colorName,
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
        history,
        percentages,
        winnersArray,
        STEAM_URL,
        setBetAmount,
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
