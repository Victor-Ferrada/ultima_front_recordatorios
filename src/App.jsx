import { useState } from 'react';
import './App.css';

function App() {
  const [recordatorios, setRecordatorios] = useState([]);
  const [fecha, setFecha] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [importante, setImportante] = useState(false);
  const [editIndex, setEditIndex] = useState(null);

  const agregarRecordatorio = (e) => {
    e.preventDefault();
    const nuevoRecordatorio = { fecha, descripcion, importante };

    if (editIndex !== null) {
      const updatedRecordatorios = [...recordatorios];
      updatedRecordatorios[editIndex] = nuevoRecordatorio;
      setRecordatorios(updatedRecordatorios);
      setEditIndex(null);
    } else {
      setRecordatorios([...recordatorios, nuevoRecordatorio]);
    }

    setFecha('');
    setDescripcion('');
    setImportante(false);
  };

  const editarRecordatorio = (index) => {
    const recordatorio = recordatorios[index];
    setFecha(recordatorio.fecha);
    setDescripcion(recordatorio.descripcion);
    setImportante(recordatorio.importante);
    setEditIndex(index);
  };

  const eliminarRecordatorio = (index) => {
    const updatedRecordatorios = recordatorios.filter((_, i) => i !== index);
    setRecordatorios(updatedRecordatorios);
  };

  return (
    <div className="App">
      <h1>Recordatorio</h1>
      <form onSubmit={agregarRecordatorio}>
        <div>
          <label>Fecha: </label>
          <input 
            type="date" 
            value={fecha} 
            onChange={(e) => setFecha(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>Descripción: </label>
          <input 
            type="text" 
            value={descripcion} 
            onChange={(e) => setDescripcion(e.target.value)} 
            required 
          />
        </div>
        <div>
          <label>
            <input 
              type="checkbox" 
              checked={importante} 
              onChange={(e) => setImportante(e.target.checked)} 
            />
            Importante
          </label>
        </div>
        <button type="submit">{editIndex !== null ? 'Guardar Cambios' : 'Agregar'}</button>
      </form>

      <div>
        {recordatorios.map((recordatorio, index) => (
          <div key={index} className="recordatorio-card">
            <span>{recordatorio.fecha}</span>
            <p>{recordatorio.descripcion}</p>
            {recordatorio.importante && <span className="estrella">★</span>}
            <div className="acciones">
              <button onClick={() => editarRecordatorio(index)}>Editar</button>
              <button onClick={() => eliminarRecordatorio(index)}>Eliminar</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;