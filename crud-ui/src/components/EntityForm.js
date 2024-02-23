import React, { useState } from 'react';
import axios from 'axios';

const EntityForm = ({ onCreate }) => {
  const [entityData, setEntityData] = useState({
    name: '',
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setEntityData(prevData => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/encje', entityData);
      const newEntity = response.data;
      onCreate(newEntity);
      setEntityData({
        name: '',
      });
    } catch (error) {
      console.error('Błąd tworzenia wpisu:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Imie:
        <input type="text" name="name" value={entityData.name} onChange={handleChange} />
      </label>
      {}
      <button type="submit">Dodaj</button>
    </form>
  );
};

export default EntityForm;
