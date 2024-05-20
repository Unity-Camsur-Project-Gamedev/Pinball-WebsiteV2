/* eslint-disable */
import React from "react";
import Modal from "@mui/material/Modal";
import Box from "@mui/material/Box";
import Snackbar from "@mui/material/Snackbar";
import { Button } from "@mui/material";
import useModal from "../context/AddCreditsModalContext";

//redux
import { useDispatch, useSelector } from "react-redux";
import { handleWalletClose } from "../Slice/ModalSlice";

function TopUpModal() {
  const {
    topUpValue,
    topUpAmount,
    selectedTopUpButton,
    setSelectedTopUpButton,
    setTopUpAmount,
    handleTopUpButton,
    handleTopUpInputChange,
    handleAddCreditsButton,
  } = useModal();

  const dispatch = useDispatch();
  const walletOpen = useSelector((state) => state.modal.walletOpen);
  return (
    <>
      <Modal
        open={walletOpen}
        onClose={() => {
          dispatch(handleWalletClose());
          setSelectedTopUpButton(null);
          setTopUpAmount("");
        }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        className="flex items-center justify-center"
      >
        <Box className="bg-white rounded-md flex flex-col items-center p-5 ">
          <p className="text-xl uppercase font-bold font-['Poppins']">
            top up your credits
          </p>
          <div className="flex flex-col gap-4  py-2">
            <div className="">
              <p className="capitalize text-sm font-['Poppins']">
                cash in value:
              </p>
              <div className=" grid grid-cols-3 gap-2 text-center">
                {topUpValue.map((button, key) => (
                  <div
                    key={key}
                    className={`p-2 border-2 ${
                      selectedTopUpButton === button
                        ? "border-[#E26226]"
                        : "border-grey"
                    } cursor-pointer`}
                    onClick={() => handleTopUpButton(button)}
                    // data-topup={key}
                  >
                    <p className="text-dynamicSmall ">{button}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="">
              <p className="capitalize text-sm font-['Poppins']">
                input amount:
              </p>
              <div className="flex items-center justify-center px-2 ">
                <input
                  type="text"
                  value={
                    topUpAmount !== ""
                      ? `₱ ${parseFloat(topUpAmount).toLocaleString()}`
                      : "₱ 0"
                  }
                  className="text-dynamicMid w-full mx-auto text-[#E26226] outline-none border-none"
                  onChange={handleTopUpInputChange}
                  data-topup="topup"
                />
              </div>
            </div>
            <div className="flex items-center justify-between pr-2">
              <p className="capitalize text-sm font-bold font-['Poppins']">
                total payment:
              </p>
              <p className="capitalize text-xl text-[#E26226] font-bold font-['Poppins']">
                {topUpAmount !== ""
                  ? `₱ ${parseFloat(topUpAmount).toLocaleString()}`
                  : "₱ 0"}
              </p>
            </div>
          </div>
          <div className="w-full">
            <Button
              variant="contained"
              className="w-full"
              style={{
                backgroundColor: "#14C61B",
                color: "white",
                // border: '2px solid magenta',
                fontSize: "1rem",
                paddingTop: "3%",
                paddingBottom: "3%",
                fontFamily: "Poppins",
                fontWeight: "bold",
              }}
              onClick={() => {
                handleAddCreditsButton(); //process adding credits in the parent component
                dispatch(handleWalletClose());
              }}
              data-paynow="paynow"
            >
              pay now
            </Button>
          </div>
        </Box>
      </Modal>
    </>
  );
}

export default TopUpModal;
