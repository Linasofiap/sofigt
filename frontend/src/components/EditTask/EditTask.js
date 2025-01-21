import React, { useState } from 'react';
import axios from 'axios';

const EditTask = ({ task, onTaskUpdated }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleUpdate = (e) => {
    e.preventDefault();
    
    const updatedTask = { title, description, _id: task._id };
    
    axios.put(`http://localhost:5000/tasks/${task._id}`, updatedTask)
      .then(response => {
        console.log('Tarea actualizada:', response.data);
        
         
       onTaskUpdated(response.data);

        alert('Tarea actualizada correctamente');
      })
      .catch(err => console.error('Error al actualizar tarea', err));
  };

  return (
    <form onSubmit={handleUpdate}>
      <h2>Editar Tarea</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título"
        required
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Descripción"
        required
      />
      <button type="submit">Guardar cambios</button>
    </form>
  );
};

export default EditTask;
