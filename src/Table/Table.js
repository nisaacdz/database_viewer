import { useEffect, useState } from 'react';
import './Table.css';
import { getColumnNames, getAllRows } from '../parser';

const Table = ({ name, database }) => {
  const [table, setTable] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    try {
      const headers = getColumnNames(database, name);
      const rows = getAllRows(database, name);
      setTable({ headers, rows });
      setLoading(false);
    } catch (e) {
      setTable(null);
      setLoading(false);
    }
  }, [name]);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!table) {
    return (
      <div className="table-container">
        <h2>{name}</h2>
        <p> Not a valid SQL table. </p>
      </div>
    );
  }

  const { headers, rows } = table;

  return (
    <div className="table-container">
      <h2>{name}</h2>
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