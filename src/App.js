import {useState} from 'react';
import './App.css';

import MainPage from "./MainPage/MainPage";
import ViewPage from "./ViewPage/ViewPage";

function App() {
  const [database, setDatabase] = useState(null);

  const handleUpdate = (value) => {
    setDatabase(value);
  };

  if (database) {
    return <ViewPage data={database} update={handleUpdate}/>;
  } else {
    return <MainPage update={handleUpdate}/>;
  }
}

export default App;