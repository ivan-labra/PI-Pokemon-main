import './App.css';
import Rutas from './routes/Rutas.js';
import { BrowserRouter } from 'react-router-dom';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Rutas />
      </BrowserRouter>
    </div>
  );
}

export default App;
