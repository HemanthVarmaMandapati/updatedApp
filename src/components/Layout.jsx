// App.jsx
import React from "react";
import { FaHome } from "react-icons/fa";
import { CiMail } from "react-icons/ci";
import { IoStatsChartOutline } from "react-icons/io5";
import { IoSettingsOutline } from "react-icons/io5";
import { CiSearch } from "react-icons/ci";
import Homepage from "./homePage";
import CarGrid from "./grid";
import { useState } from "react";

// import { AgGridReact } from "ag-grid-react";
// import "ag-grid-community/styles/ag-grid.css";
// import "ag-grid-community/styles/ag-theme-alpine.css";

export default function Layout() {
  const [showHome, setShowHome] = useState(true);
  const [gridData, setGridData] = useState(null);

  const handleDivisionClick = (data) => {
    setGridData(data);
    setShowHome(false);
  };

  const onHomeClick = () => {
    setShowHome(true);
  };

  return (
    <div className="h-screen overflow-hidden">
      <div>
        <header>
          <div>TD-Logo</div>
          <div>
            <h1>Data Management Portal</h1>
          </div>
          <div style={{ display: "flex" }}>
            <CiSearch />
            <input
              type="search"
              placeholder="search..."
              style={{ border: "1px", paddingLeft: "5px" }}
            ></input>
          </div>
        </header>

        <aside>
          <div className="asidehover" style={{ padding: "20px" }}>
            <button onClick={onHomeClick}>
              <FaHome size={20} />
            </button>
          </div>
          <div className="asidehover" style={{ padding: "20px" }}>
            <button>
              <IoStatsChartOutline size={20} />
            </button>
          </div>
          <div className="asidehover" style={{ padding: "20px" }}>
            <button>
              <CiMail size={20} />
            </button>
          </div>
          <div className="asidehover" style={{ padding: "20px" }}>
            <button>
              <IoSettingsOutline size={20} />
            </button>
          </div>
        </aside>
        <main>
          {showHome ? (
            <Homepage onDivisionClick={handleDivisionClick} />
          ) : (
            <CarGrid data={gridData}/>
          )}
        </main>
      </div>
    </div>
  );
}
