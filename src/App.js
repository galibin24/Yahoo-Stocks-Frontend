import axios from "axios";
import React, { useState } from "react";

import InputFields from "./components/inputFields";
import CustomTable from "./components/table";

import "react-date-range/dist/styles.css"; // main style file
import "react-date-range/dist/theme/default.css"; // theme css file
import "./App.css";

// TODO add names !!!!!

// TODO We can batch requests by dividing the stocks in partions and loading them
// TODO when the return result empty show error

function App() {
  const [loading, setLoading] = useState(false);
  const [showTable, setShowTable] = useState(false);
  const [tableData, setTableData] = useState();
  const [showError, setShowError] = useState(false);

  const handleParams = (params) => {
    // can use axios default functionality but no time

    setLoading(true);
    setShowTable(false);
    const url =
      "http://2f3e3dba02fd.ngrok.io/process" +
      "?" +
      new URLSearchParams(params);

    axios.get(url).then(async (response) => {
      if (
        Object.keys(response.data).length === 0 &&
        response.data.constructor === Object
      ) {
        setLoading(false);

        setShowError(true);
      } else {
        await setTableData(response.data);
        setShowError(false);
        setLoading(false);
        setShowTable(true);
      }
    });
  };
  return (
    <div className="App">
      <InputFields handleParams={handleParams}></InputFields>
      {loading && (
        <div className="text-center loader-wrap">
          <div
            class="spinner-border text-primary"
            style={{ width: 3 + "rem", height: 3 + "rem" }}
            role="status"
          >
            <span class="sr-only">Loading...</span>
          </div>
          <h5>Please wait while we loading your results. </h5>
        </div>
      )}
      {showError && (
        <div className="text-center loader-wrap">
          <h5>Sorry, we didn't find any matches.</h5>
        </div>
      )}
      {showTable && <CustomTable data={tableData}></CustomTable>}
    </div>
  );
}

export default App;
