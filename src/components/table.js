import React, { useState } from "react";
import { Table } from "react-bootstrap";
import { format } from "fecha";
import "./table.css";
// Bootstrap CSS
import "bootstrap/dist/css/bootstrap.min.css";
// To make rows collapsible
import "bootstrap/js/src/collapse.js";
import dropIcon from "./images/arrow-down-sign-to-navigate.png";

function numberToString(number) {
  let units = ["k", "M", "B", "T"];

  // Divide to get SI Unit engineering style numbers (1e3,1e6,1e9, etc)
  let unit = Math.floor((number.toFixed(0).length - 1) / 3) * 3;
  // Calculate the remainder
  let num = (number / ("1e" + unit)).toFixed(2);
  let unitname = units[Math.floor(unit / 3) - 1];

  // output number remainder + unitname
  return num + unitname;
}

function RowColapsible(props) {
  const [show, setShow] = useState(false);
  const data = props.data;

  const sortedData = sortDate(data);

  console.log(sortedData);
  console.log(data);
  const handleShow = async () => {
    const elems = document.getElementsByClassName(
      "collapse multi-collapse1 " + props.symbol
    );

    console.log(elems);
    await setShow(!show);

    Array.from(elems).map((elem) => {
      if (show) {
        elem.classList.add("show");
      } else {
        elem.classList.remove("show");
      }
    });
  };
  return (
    <>
      <tr>
        <td
          style={{
            border: "1px solid Transparent",
            background: "white",
          }}
        >
          <button
            onClick={handleShow}
            style={{
              backgroundColor: "white",
              border: "1px solid Transparent",
            }}
          >
            <img
              src={dropIcon}
              alt="not found"
              style={{
                width: "10px",
                height: "10px",
              }}
            ></img>
          </button>
        </td>
        <td>{sortedData.name}</td>
        <td>{props.symbol}</td>
        <td>{sortedData.minPrice + "-" + sortedData.maxPrice}</td>
        <td>
          {sortedData.minPercentageChange +
            "-" +
            sortedData.maxPercentageChange}
        </td>
        <td>{sortedData.minMarketCap + "-" + sortedData.maxMarketCap}</td>
        <td>{sortedData.minDate + "-" + sortedData.maxDate}</td>
        <td>{sortedData.minVolume + "-" + sortedData.maxVolume}</td>
        <td>{sortedData.incidences}</td>
        <td>{sortedData.recoveryDays}</td>
      </tr>
      {data.map((values) => {
        console.log(values);
        const percentageDrop = (values.day_drop * 100).toFixed(2) + "%";
        const marketCap = numberToString(values.market_cap);
        const startDate = format(
          new Date(values.datetime * 1000),
          "mediumDate"
        );
        return (
          <>
            <tr
              class={"collapse multi-collapse1 " + values.ticker}
              // id={values.ticker}
              style={{ transition: "max-height 0.2s ease-out" }}
            >
              <td
                style={{
                  border: "1px solid Transparent",
                  background: "white",
                }}
              ></td>
              <td></td>
              <td></td>
              <td>{"$" + values.close_price}</td>
              <td>{percentageDrop}</td>
              <td>{marketCap}</td>
              <td>{startDate}</td>
              <td>{values.volume}</td>
              <td>{values.days_to_recover + " " + "days"}</td>
            </tr>
          </>
        );
      })}
    </>
  );
}

function Row(props) {
  const data = props.data[0];
  const percentageDrop = (data.day_drop * 100).toFixed(2) + "%";
  const marketCap = numberToString(data.market_cap);
  const startDate = format(new Date(data.datetime * 1000), "mediumDate");

  return (
    <>
      <tr>
        <td
          style={{
            border: "1px solid Transparent",
            background: "white",
          }}
        ></td>
        <td>{data.company_name}</td>
        <td>{data.ticker}</td>
        <td>{"$" + data.close_price}</td>
        <td>{percentageDrop}</td>
        <td>{marketCap}</td>
        <td>{startDate}</td>
        <td>{data.volume}</td>
        <td>{data.days_to_recover + " " + "days"}</td>
      </tr>
    </>
  );
}

export default function CustomTable(props) {
  const data = props.data;
  console.log(Object.entries(data));
  //   console.log(Object.entries(data));
  if (data === undefined) return;

  return (
    <div className="container-fluid table-cont">
      <Table>
        <thead>
          <tr>
            <th
              style={{
                border: "1px solid Transparent",
                // borderLeft: "1px solid black",
                background: "white",
                width: 5 + "px",
              }}
            ></th>
            <th>Name</th>
            <th>Symbol</th>
            <th>Price</th>
            <th>% Change</th>
            <th>Market Cap</th>
            <th>Dates</th>
            <th>Volume</th>
            <th>Recovery Time</th>
          </tr>
        </thead>
        <tbody>
          {/* <Row></Row> */}
          {Object.entries(data).map(([key, value]) => {
            if (value.length === 1) {
              return <Row data={value} symbol={key} key={key}></Row>;
            } else {
              return (
                <RowColapsible
                  data={value}
                  symbol={key}
                  key={key}
                ></RowColapsible>
              );
            }
          })}
        </tbody>
      </Table>
    </div>
  );
}

const sortDate = (data) => {
  return {
    maxPrice:
      "$" +
      Math.max.apply(
        Math,
        data.map(function (o) {
          return o.close_price;
        })
      ),
    minPrice:
      "$" +
      Math.min.apply(
        Math,
        data.map(function (o) {
          return o.close_price;
        })
      ),
    maxPercentageChange:
      (
        Math.max.apply(
          Math,
          data.map(function (o) {
            return o.day_drop;
          })
        ) * 100
      ).toFixed(2) + "%",

    minPercentageChange:
      (
        Math.min.apply(
          Math,
          data.map(function (o) {
            return o.day_drop;
          })
        ) * 100
      ).toFixed(2) + "%",

    maxMarketCap: numberToString(
      Math.max.apply(
        Math,
        data.map(function (o) {
          return o.market_cap;
        })
      )
    ),

    minMarketCap: numberToString(
      Math.min.apply(
        Math,
        data.map(function (o) {
          return o.market_cap;
        })
      )
    ),
    maxDate: format(
      Math.max.apply(
        Math,
        data.map(function (o) {
          return o.datetime;
        })
      ) * 1000,
      "mediumDate"
    ),
    minDate: format(
      Math.min.apply(
        Math,
        data.map(function (o) {
          return o.datetime;
        })
      ) * 1000,
      "mediumDate"
    ),
    maxVolume: Math.max.apply(
      Math,
      data.map(function (o) {
        return o.volume;
      })
    ),
    minVolume: Math.min.apply(
      Math,
      data.map(function (o) {
        return o.volume;
      })
    ),
    incidences: data.length,
    averageRecovery: (
      data.reduce((total, next) => total + data.days_to_recover, 0) /
      data.length
    ).toFixed(0),
    name: data[0].company_name,
  };
};
