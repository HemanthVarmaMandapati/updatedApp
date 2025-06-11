import React, { useState, useEffect } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import DateFilter from "./datefilter";
import { format } from "date-fns";
import exportToExcel from "./exportData";

export default function CarGrid(stitchInfo) {
  const [filteredData, setFilteredData] = useState(stitchInfo.data);
  const [rowData, setRowData] = useState([]);
  const [columnDefs, setColumnDefs] = useState([]);

  useEffect(() => {
    if (filteredData && filteredData.length > 0) {
      setRowData(filteredData);

      const cols = Object.keys(filteredData[0]).map((key) => ({
        field: key,
        headerName: key.replace(/_/g, " "),
        sortable: true,
        filter: true,
        flex: 1,
        minWidth: 120,
        editable: false,
      }));

      setColumnDefs(cols);
    }
  }, []);

  const counts = filteredData.reduce((acc, arr) => {
    const status = arr.STATUS;
    acc[status] = (acc[status] || 0) + 1;
    return acc;
  }, {});

  console.log("Hi1", counts);
  const grpCodes = [];
  const malCodes=[];
  let ind = 0;

  stitchInfo.data.map((item) => {
    grpCodes[ind] = item.GROUP_CODE;
    malCodes[ind] = item.SOURCE_COUNT;
    ind = ind + 1;
  });

  const uniqueGroupCodes = [...new Set(grpCodes)];
  const uniqueSourceCodes = [...new Set(malCodes)];

  console.log("Hi2", uniqueGroupCodes);

  const handleRangeChange = ({ startDate, endDate }) => {
    const filtered = stitchInfo.data.filter((item) => {
      const createDate = new Date(item.CREATE_DT);
      console.log(createDate >= startDate && createDate <= endDate ? true : "");
      return createDate >= startDate && createDate <= endDate;
    });
    setFilteredData(filtered);
    setRowData(filtered);
  };

  console.log("Hi4", filteredData);

  const handleChange = (e) => {
    const filtered = stitchInfo.data.filter((item) => {
      return item.GROUP_CODE == e.target.value;
    });
    setRowData(filtered);
    setFilteredData(filtered);
  };

  const handleSourceChange = (e) => {
    const filtered = stitchInfo.data.filter((item) => {
      return item.SOURCE_COUNT == e.target.value;
    });
    setRowData(filtered);
    setFilteredData(filtered);
  };

  const handleExport = () => {
    exportToExcel(filteredData, "exported_data");
  };

  return (
    <div>
      <div className="KdS">
        <div className="hover-underline">
          <h1
            style={{
              paddingRight: "20px",
              paddingLeft: "20px",
              paddingBottom: "12px",
            }}
          >
            KDE
          </h1>
        </div>
        <div className="hover-underline">
          <h1>Stitching</h1>
        </div>
      </div>
      <div className="gkds1">
        <h1 style={{ fontSize: "20px", padding: "25px" }}>Stitching</h1>
        <div className="gbox gboxT cardhover">
          <div>
            <p>Total</p>
          </div>
          <div>
            <h2>{filteredData.length}</h2>
          </div>
        </div>
        <div className="gbox gboxC cardhover">
          <p>Completed</p>
          <h2> {counts["COMPLETED"] ? counts["COMPLETED"] : "0"}</h2>
        </div>
        <div className="gbox gboxB cardhover">
          <p>Breached</p>
          <h2>{counts["BREACHED"] ? counts["BREACHED"] : "0"}</h2>
        </div>
        <div className="gbox gboxF cardhover">
          <p>Failed</p>
          <h2>{counts["FAILED"] ? counts["FAILED"] : "0"}</h2>
        </div>
        <div className="gbox gboxIN cardhover">
          <p>In Progress</p>
          <h2>{counts["IN PROGRESS"] ? counts["IN PROGRESS"] : "0"}</h2>
        </div>
        <div className="gbox gboxY cardhover">
          <p>Yet To Start</p>
          <h2> {counts["YET TO START"] ? counts["YET TO START"] : "0"}</h2>
        </div>
        <div className="impbutton cardhover1">
          <h2 onClick={handleExport}>Import</h2>
        </div>
      </div>

      <div className="gkds2">
        <div style={{ display: "flex", fontSize: "x-small" }}>
          <h1 style={{ paddingRight: "15px" }}>Malcode:</h1>
          <select onChange={handleSourceChange}
            name="cars"
            id="cars"
            style={{ width: "110px", height: "25px", borderRadius: "5px" }}
          >
            {uniqueSourceCodes.map((option) => (
              <option key={option.id} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div style={{ display: "flex", fontSize: "x-small" }}>
          <h1 style={{ padding: "0px 15px" }}>Group Code:</h1>

          <select
            name="cars"
            id="cars"
            onChange={handleChange}
            style={{ width: "110px", height: "25px", borderRadius: "5px" }}
          >
            {uniqueGroupCodes.map((option) => (
              <option key={option.id} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
        <div className="">
          <DateFilter onRangeChange={handleRangeChange} />
        </div>
        <div className="impbutton1 cardhover1">
          <h2>Filter</h2>
        </div>
        <div className="impbutton1 cardhover1" style={{ left: "75px" }}>
          <h2 onClick={handleExport}>Import</h2>
        </div>
      </div>

      <div className="grid">
        <div className="ag-theme-alpine" style={{ height: 550, width: "100%" }}>
          <AgGridReact
            rowData={rowData}
            columnDefs={columnDefs}
            defaultColDef={{
              filter: true,
              sortable: true,
              resizable: true,
            }}
          />
        </div>
      </div>
    </div>
  );
}
