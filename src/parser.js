import initSqlJs from 'sql.js';

const SQL = await initSqlJs({locateFile: () => '/sql-wasm.wasm'});

export async function loadDatabase(file) {
  const data = new Uint8Array(await file.arrayBuffer());
  const db = new SQL.Database(data);
  return db;
}

export function getTableNames(db) {
  const result = db.exec("SELECT name FROM sqlite_master WHERE type='table';");
  const tableNames = result[0].values.map(row => row[0]);
  return tableNames;
}

export function getColumnNames(db, tableName) {
  const result = db.exec(`PRAGMA table_info(${tableName});`);
  const columnNames = result[0].values.map(row => row[1]);
  return columnNames;
}

export function getAllRows(db, tableName) {
  const result = db.exec(`SELECT * FROM ${tableName};`);
  if (!result || !result[0]) return [];
  const rows = result[0].values;
  return rows;
}

