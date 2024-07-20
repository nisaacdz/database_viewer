import { useEffect, useState } from 'react';
import './Table.css';
import { getColumnNames, getAllRows } from '../parser';

const Table = ({ name, database }) => {
  const [table, setTable] = useState(null);

  useEffect(() => {
    const headers = getColumnNames(database, name);
    const rows = getAllRows(database, name);
    console.log(rows);
    setTable({ headers, rows });
  }, [name]);

  if (!table) {
    return <div/>;
  }

  const { headers, rows } = table;

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={rowIndex}>
              {row.map((cell, cellIndex) => (
                <td key={cellIndex}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;