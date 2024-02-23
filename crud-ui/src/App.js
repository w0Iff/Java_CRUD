import React, { useState, useEffect } from 'react';
import './App.css';
import axios from 'axios';
import EntityList from './components/EntityList';
import EntityForm from './components/EntityForm';

function App() {
  const [entities, setEntities] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:8080/encje')
      .then(response => {
        setEntities(response.data);
      })
      .catch(error => {
        console.error('Błąd pobrania danych:', error);
      });
  }); 

  const handleEntityCreate = (newEntity) => {
    setEntities(prevEntities => [...prevEntities, newEntity]);
  };

  return (
    <div className="App">
      <h1>Specyfinczy Menadżer Imion</h1>
      <EntityForm onCreate={handleEntityCreate} />
      <EntityList entities={entities} />
    </div>
  );
}

export default App;
