import React, { useState, useMemo, useEffect } from "react";

import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";

//redux
import { useSelector } from "react-redux";

const dateFilterParams = {
  comparator: (filterLocalDateAtMidnight, cellValue) => {
    const cellDate = asDate(cellValue);
    if (filterLocalDateAtMidnight.getTime() === cellDate.getTime()) {
      return 0;
    }
    if (cellDate < filterLocalDateAtMidnight) {
      return -1;
    }
    if (cellDate > filterLocalDateAtMidnight) {
      return 1;
    }
    return 0;
  },
};

const asDate = (dateAsString) => {
  const splitFields = dateAsString.split("/");
  return new Date(
    Number.parseInt(splitFields[2]),
    Number.parseInt(splitFields[1]) - 1,
    Number.parseInt(splitFields[0])
  );
};

export default function BetHistory2() {
  const gridStyle = useMemo(() => ({ height: "100%", width: "100%" }), []);
  const betHistory = useSelector((state) => state.user.betHistory);

  const [columnDefs] = useState([
    {
      field: "createdAt",
      headerName: "Date",
      filter: "agDateColumnFilter",
      filterParams: dateFilterParams,
      cellStyle: (params) => {
        if (params.node.rowPinned) {
          return {
            fontWeight: "600",
            backgroundColor: "gainsboro",
            textAlign: "center",
          };
        } else {
          return null;
        }
      },
      headerClass: "header-style",
      cellClass: "cell-style",
      cellRenderer: (params) => {
        const cellValue = params.value;
        if (params.node.rowPinned) {
          return `Total:`;
        } else {
          return new Date(cellValue).toLocaleDateString("en-US");
        }
      },
      flex: 1,
      sort: "desc",
    },
    {
      field: "game_id",
      headerName: "Game ID",
      filter: "agTextColumnFilter",
      cellStyle: (params) => {
        if (params.node.rowPinned) {
          return {
            fontWeight: "600",
            backgroundColor: "gainsboro",
            textAlign: "center",
          };
        } else {
          return null;
        }
      },
      headerClass: "header-style",
      cellClass: "cell-style",
      flex: 1,
    },
    {
      field: "bet_data",
      headerName: "Color",
      filter: "agTextColumnFilter",
      cellStyle: (params) => {
        if (params.node.rowPinned) {
          return {
            fontWeight: "600",
            backgroundColor: "gainsboro",
            textAlign: "center",
          };
        } else if (params.value === "Yellow") {
          return {
            color: "#ffd300",
          };
        } else if (params.value === "Red") {
          return {
            color: "#ED3130",
          };
        } else if (params.value === "Blue") {
          return {
            color: "#276ADD",
          };
        } else if (params.value === "Green") {
          return {
            color: "#56DE33",
          };
        } else if (params.value === "Gold") {
          return {
            color: "#ffbf00",
          };
        } else if (params.value === "Violet") {
          return {
            color: "#9A3FBC",
          };
        } else if (params.value === "Orange") {
          return {
            color: "#F08F40",
          };
        } else if (params.value === "Pink") {
          return {
            color: "#DC63D0",
          };
        } else if (params.value === "Cyan") {
          return {
            color: "#33C5ED",
          };
        } else {
          return null;
        }
      },
      headerClass: "header-style",
      cellClass: "cell-style",
      flex: 1,
    },
    {
      field: "amount",
      headerName: "Bet Amount",
      filter: "agNumberColumnFilter",
      cellStyle: (params) => {
        if (params.node.rowPinned) {
          return {
            fontWeight: "600",
            backgroundColor: "gainsboro",
            textAlign: "center",
          };
        } else {
          return null;
        }
      },
      headerClass: "header-style",
      cellClass: "cell-style",
      valueFormatter: (params) => {
        return "₱" + formatNumber(parseFloat(params.value));
      },
      flex: 1,
    },
    {
      field: "status",
      headerName: "Win/Lose",
      filter: "agTextColumnFilter",
      cellStyle: (params) => {
        if (params.node.rowPinned) {
          return {
            fontWeight: "600",
            backgroundColor: "gainsboro",
            textAlign: "center",
          };
        } else if (params.value === "Win") {
          return {
            color: "green",
          };
        } else if (params.value === "Lose") {
          return {
            color: "red",
          };
        } else {
          return null;
        }
      },
      headerClass: "header-style",
      cellClass: "cell-style",
      flex: 1,
    },
    {
      field: "status",
      headerName: "Result",
      filter: "agTextColumnFilter",
      cellStyle: (params) => {
        if (params.node.rowPinned) {
          return {
            fontWeight: "600",
            backgroundColor: "gainsboro",
            textAlign: "center",
          };
        } else if (params.value === "Win") {
          return {
            color: "green",
          };
        } else if (params.value === "Lose") {
          return {
            color: "red",
          };
        } else {
          return null;
        }
      },
      cellRenderer: (params) => {
        if (params.value === "Win") {
          return "+" + (params.data.amount * 7).toLocaleString();
        } else if (params.value === "Lose") {
          return "-" + params.data.amount.toLocaleString();
        } else {
          return params.value;
        }
      },
      headerClass: "header-style",
      cellClass: "cell-style",
      flex: 1,
    },
  ]);

  const formatNumber = (number) => {
    return (Math.round((number + Number.EPSILON) * 100) / 100)
      .toString()
      .replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  };

  return (
    <div className="w-full h-full lg:w-full flex items-center justify-center">
      <div className="w-[90%] lg:w-full flex flex-col gap-6">
        <h1 className="text-center text-white text-dynamicMid font-bold uppercase font-['Poppins']">
          bet history
        </h1>
        <div
          style={gridStyle}
          className="ag-theme-quartz rounded-lg overflow-x-auto mb-10"
        >
          <div className="min-w-[600px] h-[30rem]">
            <AgGridReact
              rowData={betHistory}
              columnDefs={columnDefs}
              paginationAutoPageSize
            />
          </div>
        </div>
      </div>
    </div>
  );
}
