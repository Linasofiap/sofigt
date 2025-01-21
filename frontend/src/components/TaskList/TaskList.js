import React, { useState, useEffect } from 'react';
import axios from 'axios';
import EditTask from '../EditTask/EditTask';
import './TaskList.css';

const TaskList = ({ tasks, setTasks }) => {
  const [editingTask, setEditingTask] = useState(null); 

  const deleteTask = (id) => {
    if (window.confirm('¿Seguro que deseas eliminar esta tarea?')) {
      axios
        .delete(`http://localhost:5000/tasks/${id}`)
        .then(() => {
          setTasks(prevTasks => prevTasks.filter((task) => task._id !== id));
        })
        .catch((err) => console.error('Error al eliminar tarea', err));
    }
  };

  const handleTaskUpdated = (updatedTask) => {
    setTasks((prevTasks) => {
      const updatedTasks = prevTasks.map((task) =>
        task._id === updatedTask._id ? { ...task, ...updatedTask } : task
      );
      return updatedTasks; 
    });
    setEditingTask(null); 
  };

  useEffect(() => {
    console.log('Tareas actualizadas:', tasks); 
  }, [tasks]);

  return (
    <div className="task-list-container">
      <h1>Lista de Tareas</h1>

      <ul>
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task._id} className="task-item">
              <strong>{task.title}</strong>
              <p className="task-item-description">{task.description}</p>
              <div className="task-actions">
                <button onClick={() => deleteTask(task._id)} className="delete-button">
                  Eliminar
                </button>
                <button onClick={() => setEditingTask(task)} className="edit-button">
                  Editar
                </button>
              </div>
            </li>
          ))
        ) : (
          <li>No hay tareas disponibles</li>
        )}
      </ul>

      {editingTask && (
        <EditTask
          task={editingTask}
          onTaskUpdated={handleTaskUpdated}
        />
      )}
    </div>
  );
};

export default TaskList;
