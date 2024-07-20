import './ViewPage.css';
import { useEffect, useState } from 'react';
import { getTableNames } from '../parser';
import Table from '../Table/Table';

const ViewPage = ({data, update }) => {
    const { database, filename} = data;
    const [tableNames, setTableNames] = useState(null);
    useEffect(() => {
        try {
        const value = getTableNames(database);
        setTableNames(value);
        } catch(e) {
            alert(`${filename} is not a valid SQL database`);
            update(null);
        }
    }, [database]);
    return (
        <div className="view-page-container">
            <header className="header">
                <h1>Database Visualizer</h1>
            </header>
            <section className="text-section">
                <button id='tomainpage' onClick={() => update(null)}>Back</button>
            </section>
            <section className="tables-section">
                <h2>{filename}</h2>
                {(!tableNames || tableNames.length === 0) ? (
                    <p>No tables available.</p>
                ) : (
                    tableNames.map((tableName) => (
                        <Table key={tableName} name={tableName} database={database} />
                    ))
                )}
            </section>
        </div>
    );
};

export default ViewPage;