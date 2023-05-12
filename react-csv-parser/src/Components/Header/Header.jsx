import React from "react";
import styles from "./Header.module.css";
import Papa from 'papaparse';

const acceptableCSVFileTypes = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel, .csv";

export default function Header({onUpdateCSVDataHandler}) {
  const onFileChangeHandler = (event) => {
    const csvFile = event.target.files[0];

    Papa.parse(csvFile, {
      skipEmptyLines: true,
      header: true,
      complete: function(results) {
        onUpdateCSVDataHandler(results.data);
      }
    });
    
  };

  return (
    <header className={styles.Header}>
      <label htmlFor="csvFileSelector" className={styles.InputLabel}>
        Choose File (*csv, xls, etc.)
      </label>
      <input
        type="file"
        id="csvFileSelector"
        className={styles.Input}
        accept={acceptableCSVFileTypes}
        onChange={onFileChangeHandler}
      />
    </header>
  );
}
