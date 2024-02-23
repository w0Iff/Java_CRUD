import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaTrash } from 'react-icons/fa';
import "./EntityList.css"

const EntityList = () => {
  const [entities, setEntities] = useState([]);
  const [editingEntityId, setEditingEntityId] = useState(null);
  const [editedEntityName, setEditedEntityName] = useState('');

  useEffect(() => {
    axios.get('http://localhost:8080/encje')
      .then(response => {
        setEntities(response.data);
      })
      .catch(error => {
        console.error('Błąd pobierania danych:', error);
      });
  });

  const handleEdit = (id, name) => {
    setEditingEntityId(id);
    setEditedEntityName(name);
  };

  const handleSave = async () => {
    try {
      await axios.put(`http://localhost:8080/encje/${editingEntityId}`, {
        name: editedEntityName
      });
      axios.get('http://localhost:8080/encje')
        .then(response => {
          setEntities(response.data);
        })
        .catch(error => {
          console.error('Błąd pobierania danych:', error);
        });
      console.log('Wpis zaktualizowany');
      setEditingEntityId(null);
      setEditedEntityName('');
    } catch (error) {
      console.error('Błąd aktualizacji:', error);
    }
  };

  const handleCancelEdit = () => {
    setEditingEntityId(null);
    setEditedEntityName('');
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/encje/${id}`);
      setEntities(prevEntities => prevEntities.filter(entity => entity.id !== id));
      console.log('Wpis usunięty');
    } catch (error) {
      console.error('Błąd podczas usówania wpisu:', error);
    }
  };

  return (
    <div>
      <h2>Wpisy</h2>
      <table className="entity-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Imie</th>
            <th>Akcje</th>
          </tr>
        </thead>
        <tbody>
          {entities.map(entity => (
            <tr key={entity.id}>
              <td>{entity.id}</td>
              <td>
                {editingEntityId === entity.id ? (
                  <input
                    type="text"
                    value={editedEntityName}
                    onChange={e => setEditedEntityName(e.target.value)}
                  />
                ) : (
                  entity.name
                )}
              </td>
              <td>
                {editingEntityId === entity.id ? (
                  <div>
                    <button className="save-button" onClick={handleSave}>Zapisz</button>
                    <button className="cancel-button" onClick={handleCancelEdit}>Anuluj</button>
                  </div>
                ) : (
                  <>
                    <button className="edit-button" onClick={() => handleEdit(entity.id, entity.name)}><FaEdit /></button>
                    <button className="delete-button" onClick={() => handleDelete(entity.id)}><FaTrash /></button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default EntityList;
