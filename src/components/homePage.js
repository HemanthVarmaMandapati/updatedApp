import React, { useState } from "react";
import stitchingResults from "./Stitching_results.json";
import DateFilter from "./datefilter";
import { format } from "date-fns";

function Homepage({ onDivisionClick }) {
  const [filteredData, setFilteredData] = useState(stitchingResults);

  const counts = filteredData.reduce((acc, arr) => {
    const status = arr.STATUS;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  const handleRangeChange = ({ startDate, endDate }) => {
    const filtered = stitchingResults.filter((item) => {
      const createDate = new Date(item.CREATE_DT);
      console.log(createDate >= startDate && createDate <= endDate ? true : "");
      return createDate >= startDate && createDate <= endDate;
    });
    setFilteredData(filtered);
  };

  const today = new Date();
  const formattedDate = format(today, "dd-MMMM-yyyy");

  const handleClick = () => {
    onDivisionClick(filteredData);
  };

  return (
    <div className="LMD1">
      <div className="jhead">
        <div>
          <h1>Job Execution Status</h1>
          <h2>Date: {formattedDate}</h2>
        </div>
        <div className="p-4">
          <DateFilter onRangeChange={handleRangeChange} />
        </div>
      </div>

      <div className="dashboard">
        {/* KDE Card */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>KDE</h2>
            <div>Total = {stitchingResults.length}</div>
          </div>
          <div className="circle-container">
            <div className="circleKcomp">
              <p className="fw-100">Completed</p>
              <p className="fsl">{counts["COMPLETED"]}</p>
            </div>
            <div className="circleKinp">
              <p className="fw-100">In Progress</p>
              <p className="fsl">{counts["IN PROGRESS"]}</p>
            </div>
            <div className="circleKy">
              <p className="fw-100">Yet to Start</p>
              <p className="fsl">{counts["YET TO START"]}</p>
            </div>

            <div className="circleKfail">
              <p className="fw-100">Failed</p>
              <p className="fsl">{counts["BREACHED"]}</p>
            </div>
          </div>
        </div>

        {/* Stitching Card with Chart */}
        <div className="card" onClick={handleClick}>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <h2>Stitching</h2>
            <div>Total = {filteredData.length}</div>
          </div>
          <div className="circle-container">
            <div className="circleComp">
              <p className="fw-100">Completed</p>
              <p className="fsl" style={{ marginBottom: "20px" }}>
                {counts["COMPLETED"] ? counts["COMPLETED"] : "0"}
              </p>
            </div>
            <div className="circleinp">
              <p className="fw-100">In Progress</p>
              <p className="fsl">
                {counts["IN PROGRESS"] ? counts["IN PROGRESS"] : "0"}
              </p>
            </div>
            <div className="circley">
              <p className="fw-100">Yet to Start</p>
              <p className="fsl">
                {counts["YET TO START"] ? counts["YET TO START"] : "0"}
              </p>
            </div>

            <div className="circleBreach">
              <p className="fw-100">Breached</p>
              <p style={{ fontSize: "small" }}>
                {counts["BREACHED"] ? counts["BREACHED"] : "0"}
              </p>
            </div>
          </div>
        </div>

        {/* Stitching Breach */}

        <div className="card">
          <div>
            <h2>Stitching Percentage Breach</h2>
            <div className="spbd">
              <div className="spbd1">
                <input value=" Total No. Jobs" readOnly></input>
                <button
                  className="spbb"
                  style={{ backgroundColor: "#aeaeaec7" }}
                >
                  30
                </button>
              </div>
              <div className="spbd1">
                <input value=" Completed" readOnly></input>
                <button className="spbb" style={{ backgroundColor: "#53afcd" }}>
                  25
                </button>
              </div>
              <div className="spbd1">
                <input value=" Breached" readOnly></input>
                <button
                  className="spbb"
                  style={{ backgroundColor: "#ff0000c9", color: "white" }}
                >
                  5
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Time Consuming Jobs */}
        <div className="card1">
          <h2>Time Consuming Jobs</h2>
          <table>
            <thead>
              <tr style={{ background: "#6a7f49cc" }}>
                <th>Job Name</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ACUS9_UNIIN_KDE</td>
                <td>0:24:14</td>
              </tr>
              <tr>
                <td>ACUS9_UNIIN_KDE</td>
                <td>0:24:14</td>
              </tr>
              <tr>
                <td>ACUS9_UNIIN_KDE</td>
                <td>0:24:14</td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* Top Stitching Breaches */}
        <div className="card1">
          <h2>Top Stitching Breaches (90 Days)</h2>
          <table>
            <thead>
              <tr style={{ background: "#6a7f49cc" }}>
                <th>Rank</th>
                <th>Group Code</th>
                <th>Breaches</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#1</td>
                <td>GC001</td>
                <td>145</td>
              </tr>
              <tr>
                <td>#2</td>
                <td>GC131</td>
                <td>134</td>
              </tr>
              <tr>
                <td>#3</td>
                <td>GC023</td>
                <td>56</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Homepage;
