import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  betStatus: "",
  betAmount: "0",
  initialBet: [],
  confirmedBet: [],
  gameHistory: [],
  colorPercentage: [],
  winners: [],
};

const BettingSlice = createSlice({
  name: "betting",
  initialState,
  reducers: {
    setBetStatus: (state, action) => {
      const betStatus = action.payload;
      state.betStatus = betStatus;
    },
    setBetAmount: (state, action) => {
      const betAmount = action.payload;
      state.betAmount = betAmount;
    },
    IncrementBetAmount: (state, action) => {
      const betAmountToAdd = action.payload;
      state.betAmount = String(
        parseInt(state.betAmount, 10) + parseInt(betAmountToAdd, 10)
      );
    },
    setInitialbet: (state, action) => {
      const payload = action.payload;
      if (Array.isArray(payload)) {
        if (payload.length > 0) {
          const updatedArray = [...state.initialBet];
          const existingBetIndex = state.initialBet.findIndex(
            (bet) => bet.colorIndex === payload.colorIndex
          );
          if (existingBetIndex !== -1) {
            updatedArray[existingBetIndex].amount += payload.amount;
          } else {
            updatedArray.push({
              colorIndex: payload.colorIndex,
              amount: payload.amount,
            });
          }
          state.initialBet = updatedArray;
        } else {
          state.initialBet = payload;
        }
      } else {
        state.initialBet = [...state.initialBet, payload];
      }
    },
    setConfirmedBet: (state, action) => {
      const payload = action.payload;
      if (payload.length > 0) {
        state.confirmedBet = [...state.confirmedBet, ...payload];
      } else {
        state.confirmedBet = payload;
      }
    },
    setGameHistory: (state, action) => {
      const payload = action.payload;
      state.gameHistory = [...payload];
    },
    setColorPercentage: (state, action) => {
      const payload = action.payload;
      state.colorPercentage = [...payload];
    },
    setWinners: (state, action) => {
      const payload = action.payload;
      state.winners = [...payload];
    },
  },
});

export const {
  setBetStatus,
  setBetAmount,
  IncrementBetAmount,
  setInitialbet,
  setConfirmedBet,
  setGameHistory,
  setColorPercentage,
  setWinners,
} = BettingSlice.actions;

export default BettingSlice.reducer;
