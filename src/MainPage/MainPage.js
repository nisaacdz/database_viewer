import { useState } from "react";
import "./MainPage.css";
import { loadDatabase } from "../parser";
import { Database } from "sql-wasm";

const MainPage = ({ update }) => {
  const [file, setFile] = useState(null);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleViewAttempt = async (event) => {
    if (!file) return;
    try {
        const db = await loadDatabase(file);
        await update({database: db, filename: file.name});
    } catch(e) {
        alert(`${file.name} is not a valid SQL database`);
    }
  }

  return (
    <div className="main-container">
      <h1>Database Viewer</h1>
      <div className="upload-section">
        <input type="file" onChange={handleFileChange} />
        <button className="view-button" disabled={!file} onClick={handleViewAttempt}>
          View
        </button>
      </div>
    </div>
  );
};

export default MainPage;
