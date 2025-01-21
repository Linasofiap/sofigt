import React, { useState } from 'react';
import axios from 'axios';
import './AddTask.css'; 

const AddTask = ({ onTaskAdded }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.post('http://localhost:5000/tasks', { title, description })
      .then(response => {
        onTaskAdded(response.data);
        setTitle(''); 
        setDescription(''); 
      })
      .catch(err => console.error('Error al agregar tarea', err));
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <h2 className="form-title">Agregar Tarea</h2>
      
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        required
        className="form-input"
      />
      
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        required
        className="form-textarea"
      />
      
      <button 
        type="submit" 
        className="submit-button">
        Agregar tarea
      </button>
    </form>
  );
};

export default AddTask;
