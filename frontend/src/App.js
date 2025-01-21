import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import TaskList from './components/TaskList/TaskList';
import AddTask from './components/AddTask/AddTask';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState([]);  

  const handleTaskAdded = (newTask) => {
    setTasks([...tasks, newTask]);  
  };

  return (
    <Router>
      <div className="app-container">
        <header className="navbar">
          <div className="logo">
            <img src={require('../src/assets/LOGO R5.png')} alt="Logo" className="logo-image" />
          </div>
          <nav>
            <ul className="nav-links">
              <li><Link to="/cobranzas">Cobranzas</Link></li>
              <li><Link to="/gestor-tareas">Gestor de Tareas</Link></li>
            </ul>
          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/cobranzas" element={<h1>Bienvenido a la sección de Cobranzas</h1>} />
            <Route 
              path="/gestor-tareas" 
              element={
                <div className="content-container">
                  <AddTask onTaskAdded={handleTaskAdded} />
                  <TaskList tasks={tasks} setTasks={setTasks} />
                </div>
              } 
            />
            <Route path="/" element={<h1>Bienvenido a la página principal</h1>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
