import React, { useState, useRef, useEffect } from "react";
import { DateRange } from "react-date-range";
import "./inputFields.css";

const InputFields = (props) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [marketCap, setMarketCap] = useState("Mega");
  const [percentageDrop, setPercentageDrop] = useState(0);
  const [typeOfDrop, setTypeOfDrop] = useState("single");
  const [daysToRecover, setDateToRecover] = useState(0);

  const [selectVisible, setSelectVisible] = useState(false);

  const showCalendar = () => {
    setSelectVisible(true);
  };
  const handleSelect = (ranges) => {
    setStartDate(ranges.selection.startDate);
    setEndDate(ranges.selection.endDate);
  };

  const changeMarketCap = (event) => {
    console.log(event.target.value);
    setMarketCap(event.target.value);
  };

  const changeOfType = (e) => {
    console.log(e.target.value);
    if (e.target.value == "Single-day inciddence") {
      console.log("single");
      setTypeOfDrop("single");
    }
  };

  const sendParams = () => {
    let startTimestamp = startDate.getTime().toString().substring(0, 10);
    let endTimestamp = endDate.getTime().toString().substring(0, 10);

    props.handleParams({
      startDate: startTimestamp,
      endDate: endTimestamp,
      marketCap,
      percentageDrop,
      typeOfDrop,
      daysToRecover,
    });
  };

  const selectionRange = {
    startDate: startDate,
    endDate: endDate,
    key: "selection",
  };

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-lg-3">
          <div className="form-group">
            <label for="Dates">Dates</label>
            <input
              // type="date"
              class="form-control"
              id="dates"
              value={
                new Intl.DateTimeFormat("en-US").format(startDate) +
                " : " +
                new Intl.DateTimeFormat("en-US").format(endDate)
              }
              placeholder="Enter your date range here"
              onClick={showCalendar}
            ></input>
            {selectVisible && (
              <div className="calWrapper">
                <DateRange ranges={[selectionRange]} onChange={handleSelect} />
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => setSelectVisible(false)}
                >
                  Close Calendar
                </button>
              </div>
            )}
          </div>
          {/* <</div> */}
        </div>
        <div className="col-lg-2">
          <div class="form-group">
            <label for="marketCap">Market Cap</label>
            <select
              class="form-control"
              id="marketCap"
              onChange={changeMarketCap}
            >
              <option>Mega</option>
              <option>Large</option>
              <option>Medium</option>
              <option>Small</option>
            </select>
          </div>
        </div>
        <div className="col-lg-2">
          <div class="form-group">
            <label for="percentageChange">Percentage Change</label>
            <input
              type="number"
              class="form-control"
              id="percentageChange"
              placeholder="Enter your Percentage"
              onChange={(e) => setPercentageDrop(e.target.value)}
            />
            <small id="emailHelp" class="form-text text-muted">
              please provide a number
            </small>
          </div>
        </div>
        <div className="col-lg-2">
          <div class="form-group">
            <label for="marketCap">Type of Drop</label>
            <select class="form-control" id="marketCap" onChange={changeOfType}>
              <option>Single-day inciddence</option>
              {/* <option>Large</option> */}
            </select>
          </div>
        </div>
        <div className="col-lg-2">
          <div class="form-group">
            <label for="recoveryDays">Average Recovery time</label>
            <input
              type="number"
              class="form-control"
              id="recoveryDays"
              placeholder="enter the days"
              onChange={(e) => setDateToRecover(e.target.value)}
            />
            <small id="emailHelp" class="form-text text-muted">
              please provide a number of days
            </small>
          </div>
        </div>
      </div>
      <div className="row justify-content-center">
        <button className="btn btn-primary" onClick={sendParams}>
          Find stocks
        </button>
      </div>
    </div>
  );
};

export default InputFields;
