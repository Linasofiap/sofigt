import React, { useState } from 'react';
import axios from 'axios';
import './EditTask.css'; 

const EditTask = ({ task, onTaskUpdated }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [isLoading, setIsLoading] = useState(false); 

  const handleUpdate = (e) => {
    e.preventDefault();
    
    if (!title || !description) {
      alert('Por favor, complete ambos campos.');
      return;
    }

    const updatedTask = { title, description, _id: task._id };

    setIsLoading(true);  

    axios.put(`http://localhost:5000/tasks/${task._id}`, updatedTask)
      .then(response => {
        console.log('Tarea actualizada:', response.data);
        onTaskUpdated(response.data);
        setIsLoading(false);  
        alert('Tarea actualizada correctamente');
      })
      .catch(err => {
        console.error('Error al actualizar tarea', err);
        setIsLoading(false);
        alert('Error al actualizar la tarea. Intenta nuevamente.');
      });
  };

  return (
    <form onSubmit={handleUpdate} className="edit-task-form">
      <h2>Editar Tarea</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        required
        className="input-field"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        required
        className="input-field"
      />
      <button type="submit" disabled={isLoading} className="submit-button">
        {isLoading ? 'Actualizando...' : 'Guardar cambios'}
      </button>
    </form>
  );
};

export default EditTask;

